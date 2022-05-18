import i18n from '../../i18n'
import requests from '../../helpers/requests'

export const ui = {
  namespaced: true,
  state: {
    notification: {
      display: false,
      text: 'Notification placeholder Text',
      timeout: 10000,
      class: 'success',
    },
  },
  getters: {
    notification: (state) => {
      return state.notification
    },
  },
  actions: {
    getIframeData: async ({ commit }, data) => {
      return requests.getService('general/iframe', data).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
  },
  mutations: {
    set_notification: (state, { display, code, alertClass }) => {
      ;(state.notification.display = display),
        (state.notification.text = /[a-z]/.test(code)
          ? code
          : i18n.t('Responses.' + code))
      state.notification.class = alertClass
      setTimeout(() => {
        state.notification.display = false
      })
    },
  },
}
