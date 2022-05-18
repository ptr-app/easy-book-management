import requests from '../../helpers/requests'
import store from './../index'

const user = JSON.parse(localStorage.getItem('user'))
const language = JSON.parse(localStorage.getItem('language'))
const initializeUser = user
  ? { status: { loggedIn: true }, user, language }
  : {
      status: { loggedIn: true },
      user: {},
      language,
    }

export const auth = {
  namespaced: true,
  state: initializeUser,
  action: {},
  getters: {
    loggedIn: (state) => {
      return state.status.loggedIn
    },
  },
}
