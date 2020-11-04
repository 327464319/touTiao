import Vue from 'vue'
import Vuex from 'vuex'
import { commentModules } from './modules/commentModules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: JSON.parse(window.localStorage.getItem('token_key')),
    cacheArr: ['MyLayout']
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
    },
    removeCache (state, val) {
      const index = state.cacheArr.indexOf(val)
      if (index !== -1) {
        state.cacheArr.splice(index, 1)
      }
    },
    setCache (state, val) {
      const index = state.cacheArr.indexOf(val)
      if (index === -1) {
        state.cacheArr.push(val)
      }
    }
  },
  actions: {
  },
  modules: {
    commentModules
  }
})
