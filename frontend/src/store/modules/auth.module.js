import requests from '../../helpers/requests'

const user = JSON.parse(localStorage.getItem('user'))
const language = JSON.parse(localStorage.getItem('language'))
const initializeUser = user
  ? { status: { loggedIn: true }, user, language }
  : {
      status: { loggedIn: false },
      user: null,
      language,
    }

export const auth = {
  namespaced: true,
  state: initializeUser,
  actions: {
    login: async ({ commit }, user) => {
      return requests.postService('auth/login', user).then(
        (resp) => {
          let user = resp.data.data
          localStorage.setItem('user', JSON.stringify(user))
          commit('setUser', resp.data.data)
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    registerStudent: async ({ commit }, user) => {
      return requests.postService('auth/registerStudent', user).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    registerEmployee: async ({ commit }, user) => {
      return requests.postService('auth/registerEmployee', user).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    registerSchool: async ({ commit }, user) => {
      return requests.postService('auth/registerSchool', user).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    logout: async ({ commit }) => {
      return (
        requests.postService('auth/logout').then(() => {
          localStorage.removeItem('user')
          sessionStorage.clear()
          commit('setLoggedIn', false)
          window.location.reload()
        }),
        (error) => {
          return Promise.reject(error)
        }
      )
    },
  },
  getters: {
    user(state) {
      return state.user
    },
    status(state) {
      return state.status
    },
    loggedIn: (state) => {
      return state.status.loggedIn
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setLoggedIn(state, loggedIn) {
      state.status.loggedIn = loggedIn
    },
  },
}
