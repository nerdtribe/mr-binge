import Vue from "vue";
import Vuex from "vuex";
import db from "./db";
import INITIAL_STATE from "./state";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: INITIAL_STATE,
  mutations: {
    setState(state, payload) {
      state.tmdbApiKey = payload.tmdbApiKey;
    },
    addTmdbApiKey(state, payload) {
      state.tmdbApiKey = payload;
    }
  },
  actions: {
    loadDb({ commit }, payload) {
      commit("setState", payload);
    },
    tmdbApiKey({ commit, state }, payload) {
      commit("addTmdbApiKey", payload);
      db.writeTmdbApiKey(state.tmdbApiKey);
    }
  },
  getters: {
    tmdbApiKey: state => state.tmdbApiKey
  },
  modules: {}
});
