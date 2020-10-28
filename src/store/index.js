import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: JSON.parse(window.localStorage.getItem('token_key'))
  },
  mutations: {
    logOut (state) {
      state.token = ''
      window.localStorage.removeItem('token_key')
      window.localStorage.removeItem('loglevel:webpack-dev-server')
    },
    setToken (state, data) {
      state.token = data
      window.localStorage.setItem('token_key', JSON.stringify(data))
    }
  },
  actions: {
  },
  modules: {
  }
})
