import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import { notLogged } from './middleware'
import store from '../store/index'
import middlewarePipeline from './middlewarePipeline'
import Login from '../pages/login'
import Register from '../pages/register'

Vue.use(VueRouter)
axios.defaults.baseURL = window.location.origin + '/api/'
axios.defaults.withCredentials = true

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { middleware: [notLogged] },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { middleware: [notLogged] },
  },
]

axios.interceptors.response.use(
  (res) => {
    store.commit('ui/setNotification', { display: false })
    if (res.data.code) {
      console.log(res.data.code)
      store.commit('ui/setNotification', {
        display: true,
        code: res.data.code,
        alertClass: 'sucess',
      })
    }
    return res
  },
  (err) => {
    const {
      response: { status, data },
    } = err
    store.commit('ui/setNotification', { display: false })
    if (data.code) {
      if (data.data) {
        store.commit('ui/setNotification', {
          display: true,
          code: data.data[0].msg,
          alertClass: 'error',
        })
      } else {
        store.commit('ui/setNotification', {
          display: true,
          code: data.code,
          alertClass: 'error',
        })
      }
    }
    if (status === 401) {
      store.dispatch('auth/logout').then(() => {
        router.push('/')
      })
    }
    if (status === 405) {
      console.log('Forbidden')
      router.push('/')
    }
  }
)

const router = new VueRouter({
  mode: 'history',
  bnase: '/',
  routes,
  duplicateNavigationPolicy: 'ignore',
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store,
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  })
})

export default router
