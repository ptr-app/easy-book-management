import requests from '../../helpers/requests'

export const data = {
  namespaced: true,
  actions: {
    //EMPLOYEE
    deleteEmployee: async ({}, employee) => {
      return requests.deleteService('employee/deleteEmployee', employee).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    getEmployeeBySchool: async ({}) => {
      return requests.getService('employee/getEmployeeBySchool').then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    getEmployeeByRole: async ({}, role) => {
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
    getClassBySchool: async ({}) => {
      return requests.getService('class/getClassBySchool').then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    addClass: async ({}, Class) => {
      return requests.postService('class/addClass', Class).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    deleteClass: async ({}, Class) => {
      return requests.deleteService('class/deleteClass', Class).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    editClass: async ({}, Class) => {
      return requests.postService('class/editClass', Class).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    updateEmployeeID: async ({}, employee) => {
      return requests.postService('class/updateEmployeeID', employee).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    getClassByEmployee: async ({}) => {
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
    deleteStudent: async ({}, student) => {
      return requests.deleteService('student/deleteStudent', student).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    editStudent: async ({}, student) => {
      return requests.postService('student/editStudent', student).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    getStudentsByClass: async ({}, id) => {
      return requests.getService('student/getStudentsByClass/' + id).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    getStudentsBySchool: async ({}) => {
      return requests.getService('student/getStudentsBySchool').then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    editClassStudent: async ({}, student) => {
      return requests.postService('student/editClassStudent', student).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    //BOOK
    getBooksByStudent: async ({}, id) => {
      return requests.getService('book/getBooksByStudent/' + id).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    getAllBooks: async ({}) => {
      return requests.getService('book/getAllBooks/').then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    deleteBook: async ({}, book) => {
      return requests.deleteService('book/deleteBook', book).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    addBook: async ({}, book) => {
      return requests.postService('book/addBook', book).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    editBook: async ({}, book) => {
      return requests.postService('book/editBook', book).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    rentBook: async ({}, book) => {
      return requests.postService('book/rentBook', book).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    returnBook: async ({}, book) => {
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
    addGenre: async ({}, genre) => {
      return requests.postService('genre/addGenre', genre).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    editGenre: async ({}, genre) => {
      return requests.postService('genre/editGenre', genre).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    deleteGenre: async ({}, genre) => {
      return requests.deleteService('genre/deleteGenre', genre).then(
        (resp) => {
          return Promise.resolve(resp.data.data)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    getAllGenres: async ({}) => {
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
    getAllRoles: async ({}) => {
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
