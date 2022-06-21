import i18n from '../../i18n'

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
  actions: {},
  mutations: {
    setNotification: (state, { display, code, alertClass }) => {
      state.notification.display = display
      state.notification.text = /[a-z]/.test(code)
        ? code
        : i18n.t('Responses.' + code)
      state.notification.class = alertClass
      setTimeout(() => {
        state.notification.display = false
      }, 5000)
    },
  },
}
