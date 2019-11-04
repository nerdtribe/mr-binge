import Vue from "vue";
import Vuex from "vuex";
import db from "./utils/db";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey: "",
    movies: [],
    tv: []
  },
  mutations: {
    setState(state, payload) {
      state.apiKey = payload.apiKey;
      state.movies = payload.movies;
      state.tv = payload.tv;
    },
    addApiKey(state, payload) {
      state.apiKey = payload;
    }
  },
  actions: {
    loadDb({ commit }, payload) {
      commit("setState", payload);
    },
    addApiKey({ commit, state }, payload) {
      commit("addApiKey", payload);
      db.writeApiKey(state.apiKey);
    }
  }
});
