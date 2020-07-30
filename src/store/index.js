import Vue from "vue";
import Vuex from "vuex";
import db from "./db";
import INITIAL_STATE from "./state";
import ApiService from "../utils/apiService";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: INITIAL_STATE,
  mutations: {
    setState(state, payload) {
      state.tmdbApiKey = payload.tmdbApiKey;
      state.tmdbApiEnabled = payload.tmdbApiEnabled;
      state.movies = payload.movies;
      state.tvSeries = payload.tvSeries;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    addTmdbApiKey(state, payload) {
      state.tmdbApiKey = payload;
    },
    tmdbApiEnabled(state, payload) {
      state.tmdbApiEnabled = payload;
    },
    setSearch(state, payload) {
      state.search = payload;
    },
    clearSearch(state) {
      state.search = [];
    },
    setSearchErrorMessage(state, payload) {
      state.searchErrorMessage = payload;
    },
    clearSearchErrorMessage(state) {
      state.searchErrorMessage = null;
    },
    toggleItemDetail(state) {
      state.appState.itemDetailShow = !state.appState.itemDetailShow;
    },
    toggleSearchPreviewDialog(state) {
      state.appState.searchPreviewDialogShow = !state.appState.searchPreviewDialogShow;
    },
    toggleDetailLoading(state) {
      state.appState.detailLoading = !state.appState.detailLoading;
    },
    setDetailSearchResults(state, payload) {
      state.appState.detailSearchResults = payload;
    },
    clearDetailSearchResults(state) {
      state.appState.detailSearchResults = {};
    }
  },
  actions: {
    loadDb({ commit }) {
      commit("setState", db.readDatabase());
    },
    tmdbApiKey({ commit, state }, payload) {
      commit("addTmdbApiKey", payload);
      db.writeTmdbApiKey(state.tmdbApiKey);
    },
    tmdbApiEnabled({ commit, state }, payload) {
      commit("tmdbApiEnabled", payload);
      db.writeTmdbApiEnabled(state.tmdbApiEnabled);
    },
    async searchMovies({ commit, getters }, { query }) {
      commit("setLoading", true);
      commit("clearSearchErrorMessage");
      commit("clearSearch");
      await ApiService.searchBroadTvMovie("movies", query).then(response => {
        const movies = getters.getMovies;
        const results = response.data.results.filter(result => {
          if (movies.some(movie => movie.id === result.id)) {
            return null;
          }
          return result;
        });
        if (!results.length) {
          commit(
            "setSearchErrorMessage",
            `No results found for ${query}, please revise your search.`
          );
        }
        commit("setSearch", results);
      });
      commit("setLoading", false);
    },
    async searchTv({ commit, getters }, { query }) {
      commit("setLoading", true);
      commit("clearSearchErrorMessage");
      commit("clearSearch");
      await ApiService.searchBroadTvMovie("tv", query).then(response => {
        const tvSeries = getters.getTvSeries;
        const results = response.data.results.filter(result => {
          if (tvSeries.some(series => series.id === result.id)) {
            return null;
          }
          return result;
        });
        if (!results.length) {
          commit(
            "setSearchErrorMessage",
            `No results found for ${query}, please revise your search.`
          );
        }
        commit("setSearch", results);
      });
      commit("setLoading", false);
    },
    clearSearch({ commit }) {
      commit("clearSearch");
    },
    async addMovie({ commit, dispatch }, { id }) {
      commit("setLoading", true);
      if (id && !(await db.checkIfMovieExists(id))) {
        await ApiService.searchDetailedTvMovie("movies", id).then(apiResponse => {
          db.addMovie(apiResponse).then(dbResponse => {
            dispatch("loadDb");
            return dbResponse;
          });
        });
      }
      commit("setLoading", false);
    },
    async fetchMovieDetails({ commit }, id) {
      commit("toggleDetailLoading");
      await ApiService.searchDetailedTvMovie("movies", id).then(response => {
        if (response.data) {
          commit("setDetailSearchResults", response.data.results);
        }
      });
      commit("toggleDetailLoading");
    },
    async addTvSeries({ commit, dispatch }, { id }) {
      commit("setLoading", true);
      if (!(await db.checkIfTvSeriesExists(id))) {
        await ApiService.searchDetailedTvMovie("tv", id).then(apiResponse => {
          db.addTvSeries(apiResponse).then(dbResponse => {
            dispatch("loadDb");
            return dbResponse;
          });
        });
      }
      commit("setLoading", false);
    },
    async fetchTvSeriesDetails({ commit }, id) {
      commit("toggleDetailLoading");
      await ApiService.searchDetailedTvMovie("tv", id).then(response => {
        commit("setDetailSearchResults", response.data.results);
      });
      commit("toggleDetailLoading");
    },
    toggleItemDetail({ commit }) {
      commit("toggleItemDetail");
    },
    toggleSearchPreviewDialog({ commit }) {
      commit("toggleSearchPreviewDialog");
    },
    async deleteMovie({ commit }, payload) {
      await db.deleteMovie(payload).then(response => {
        if (!response) {
          commit(
            "setSearchErrorMessage",
            "Delete error, please refresh."
          );
        }
      });
    },
    async deleteTvSeries({ commit }, payload) {
      await db.deleteTvSeries(payload).then(response => {
        if (!response) {
          commit(
            "setSearchErrorMessage",
            "Delete error, please refresh."
          );
        }
      });
    }
  },
  getters: {
    loading: state => state.loading,
    tmdbApiKey: state => state.tmdbApiKey,
    tmdbApiEnabled: state => state.tmdbApiEnabled,
    searchResults: state => state.search,
    searchErrorMessage: state => state.searchErrorMessage,
    getMovies: state => state.movies,
    getMovieById: state => givenId => state.movies.find(movies => movies.id === givenId),
    getFilteredMovies: state => query => state.movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())),
    getTvSeries: state => state.tvSeries,
    getTvSeriesById: state => givenId => state.tvSeries.find(tvSeries => tvSeries.id === givenId),
    getFilteredTvSeries: state => query => state.tvSeries.filter(series => series.name.toLowerCase().includes(query.toLowerCase())),
    itemDetailShow: state => state.appState.itemDetailShow,
    searchPreviewDialogShow: state => state.appState.searchPreviewDialogShow,
    getDetailVideo: state => state.appState.detailSearchResults
  },
  modules: {}
});

export default store;
