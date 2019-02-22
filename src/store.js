import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    localData: null

  },
  mutations: {
    change (state, localData) {
      state.localData = localData
    }
  },
  actions: {
    localData: state => state.localData
  }
})
