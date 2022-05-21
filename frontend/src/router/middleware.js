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
