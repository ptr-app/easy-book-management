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
    getClassBySchool: async ({ commit }, user) => {
      return requests.getService('class/getClassBySchool', user).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    addClass: async ({ commit }, user) => {
      return requests.postService('class/addClass', user).then(
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
