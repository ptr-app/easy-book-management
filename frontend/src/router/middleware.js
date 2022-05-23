export function notLogged({ next, store }) {
  const loggedIn = store.state.auth.status.loggedIn
  if (loggedIn) {
    localStoreage.clear()
    sesstionStoreage.clear()
    return next()
  } else {
    return next()
  }
}

export function logged({ next }) {
  const loggedIn = localStorage.getItem('user')
  if (loggedIn) {
    return next()
  } else {
    return next('/login')
  }
}
