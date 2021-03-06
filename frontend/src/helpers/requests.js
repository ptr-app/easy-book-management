import axios from 'axios'
import authHeader from './authHeader'

class request {
  static postService(url, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, { headers: authHeader() })
        .then((res) => {
          return resolve(res)
        })
        .catch((err) => {
          return reject(err)
        })
    })
  }
  static getService(url, data) {
    url = data ? url + '?' + new URLSearchParams(data).toString() : url
    return new Promise((resolve, reject) => {
      axios
        .get(url, { headers: authHeader() })
        .then((res) => {
          return resolve(res)
        })
        .catch((err) => {
          return reject(err)
        })
    })
  }
  static deleteService(url, data) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, { headers: authHeader(), data })
        .then((res) => {
          return resolve(res)
        })
        .catch((err) => {
          return reject(err)
        })
    })
  }
}

export default request
