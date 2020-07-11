import Vue from "vue";
import Vuex from "vuex";
import db from "./db";
import INITIAL_STATE from "./state";
import ApiService from "../utils/apiService";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: INITIAL_STATE,
  mutations: {
    setState(state, payload) {
      state.tmdbApiKey = payload.tmdbApiKey;
      state.tmdbApiEnabled = payload.tmdbApiEnabled;
    },
      state.loading = payload;
    },
    addTmdbApiKey(state, payload) {
      state.tmdbApiKey = payload;
    },
    tmdbApiEnabled(state, payload) {
      state.tmdbApiEnabled = payload;
    },
    setMovieSearch(state, payload) {
      state.movieSearch = payload;
    },
    clearMovieSearch(state) {
      state.movieSearch = [];
    },
    setSearchErrorMessage(state, payload) {
      state.searchErrorMessage = payload;
    },
    clearSearchErrorMessage(state) {
      state.searchErrorMessage = null;
    }
  },
  actions: {
    loadDb({ commit }, payload) {
      commit("setState", payload);
    },
    tmdbApiKey({ commit, state }, payload) {
      commit("addTmdbApiKey", payload);
      db.writeTmdbApiKey(state.tmdbApiKey);
    },
    tmdbApiEnabled({ commit, state }, payload) {
      commit("tmdbApiEnabled", payload);
      db.writeTmdbApiEnabled(state.tmdbApiEnabled);
    },
    async searchMovies({ commit }, { query }) {
      commit("setLoading", true);
      commit("clearSearchErrorMessage");
      commit("clearMovieSearch");
      await ApiService.searchBroadTvMovie("movies", query).then(response => {
        if (!response.data.results.length) {
          commit(
            "setSearchErrorMessage",
            `No results found for ${query}, please revise your search.`
          );
        }
        commit("setMovieSearch", response.data.results);
        commit("setLoading", false);
      });
    }
  },
  getters: {
    loadng: state => state.loading,
    tmdbApiKey: state => state.tmdbApiKey,
    tmdbApiEnabled: state => state.tmdbApiEnabled,
    movieSearchResults: state => state.movieSearch,
    searchErrorMessage: state => state.searchErrorMessage,
  },
  modules: {}
});
