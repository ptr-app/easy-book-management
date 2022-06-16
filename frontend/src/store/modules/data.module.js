import requests from '../../helpers/requests'

export const data = {
  namespaced: true,
  actions: {
    //EMPLOYEE
    deleteEmployee: async ({ commit }, employee) => {
      return requests.deleteService('employee/deleteEmployee', employee).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
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
    getEmployeeByRole: async ({ commit }, role) => {
      return requests.getService('employee/getEmployeeByRole/' + role).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    //CLASS
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
    updateEmployeeID: async ({ commit }, employee) => {
      return requests.postService('class/updateEmployeeID', employee).then(
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
    //STUDENT
    deleteStudent: async ({ commit }, student) => {
      return requests.deleteService('student/deleteStudent', student).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    editStudent: async ({ commit }, student) => {
      return requests.postService('student/editStudent', student).then(
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
    getStudentsBySchool: async ({ commit }) => {
      return requests.getService('student/getStudentsBySchool').then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    //BOOK
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
    getAllBooks: async ({ commit }) => {
      return requests.getService('book/getAllBooks/').then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    deletBook: async ({ commit }, book) => {
      return requests.deleteService('book/deletBook', book).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    addBook: async ({ commit }, book) => {
      return requests.postService('book/addBook', book).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    editBook: async ({ commit }, book) => {
      return requests.postService('book/editBook', book).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    rentBook: async ({ commit }, book) => {
      return requests.postService('book/rentBook', book).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    returnBook: async ({ commit }, book) => {
      return requests.postService('book/returnBook', book).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    //GENRE
    addGenre: async ({ commit }, genre) => {
      return requests.postService('genre/addGenre', genre).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    editGenre: async ({ commit }, genre) => {
      return requests.postService('genre/editGenre', genre).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    deleteGenre: async ({ commit }, genre) => {
      return requests.deleteService('genre/deleteGenre', genre).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    getAllGenres: async ({ commit }) => {
      return requests.getService('genre/getAllGenres').then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    //Roles
    getAllRoles: async ({ commit }) => {
      return requests.getService('role/getAllRoles').then(
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
