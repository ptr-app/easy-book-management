export function notLogged({ next, store }) {
  const loggedIn = store.state.auth.status.loggedIn
  if (loggedIn) {
    localStorage.clear()
    sesstionStoreage.clear()
    return next()
  } else {
    return next()
  }
}

export function logged({ next }) {
  const user = localStorage.getItem('user')
  if (user) {
    return next()
  } else {
    return next('/login')
  }
}

export function dean({ next }) {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user.role === 'dean') {
    return next()
  } else {
    return next('/home')
  }
}

export function teacher({ next }) {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user.role === 'teacher' || user.role === 'dean') {
    return next()
  } else {
    return next('/home')
  }
}
