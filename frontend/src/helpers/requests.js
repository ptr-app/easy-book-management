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
}

export default request
