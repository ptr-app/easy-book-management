import Vue from 'vue'
import Vuex from 'vuex'

import { ui } from './modules/ui.module'
import { auth } from './modules/auth.module'
import { data } from './modules/data.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
  },
  getters: {
    loading(state) {
      return state.loading
    },
  },
  mutations: {
    set_loading(state, loading) {
      state.loading = loading
    },
  },
  modules: { ui, auth },
})
