import requests from '../../helpers/requests'

export const data = {
  namespaced: true,
  actions: {
    getEmployeeBySchool: async ({ commit }) => {
      return requests.getService('employee/getEmployeeBySchool').then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    getClassBySchool: async ({ commit }) => {
      return requests.getService('class/getClassBySchool').then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    addClass: async ({ commit }, Class) => {
      return requests.postService('class/addClass', Class).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    deleteClass: async ({ commit }, Class) => {
      return requests.deleteService('class/deleteClass', Class).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    editClass: async ({ commit }, Class) => {
      return requests.postService('class/editClass', Class).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    getClassByEmployee: async ({ commit }) => {
      return requests.getService('class/getClassByEmployee').then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    getStudentsByClass: async ({ commit }, id) => {
      return requests.getService('student/getStudentsByClass/' + id).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    getBooksByStudent: async ({ commit }, id) => {
      return requests.getService('book/getBooksByStudent/' + id).then(
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
