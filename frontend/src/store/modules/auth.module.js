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
  },
  getters: {
    loggedIn: (state) => {
      return state.status.loggedIn
    },
  },
}
