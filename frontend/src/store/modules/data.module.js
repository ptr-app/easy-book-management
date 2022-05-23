import requests from '../../helpers/requests'

export const data = {
  namespaced: true,
  actions: {
    getEmployeeBySchool: async ({ commit }, user) => {
      return requests.getService('employee/getEmployeeBySchool', user).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
  },
  getters: {},
  mutations: {},
}
