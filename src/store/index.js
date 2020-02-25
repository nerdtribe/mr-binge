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
      state.tmdbApiEnabled = payload.tmdbApiEnabled;
    },
    addTmdbApiKey(state, payload) {
      state.tmdbApiKey = payload;
    },
    tmdbApiEnabled(state, payload) {
      state.tmdbApiEnabled = payload;
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
    }
  },
  getters: {
    tmdbApiKey: state => state.tmdbApiKey,
    tmdbApiEnabled: state => state.tmdbApiEnabled,
  },
  modules: {}
});
