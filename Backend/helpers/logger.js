function log(message, level) {
  if (process.env.ENABLE_LOGGING) {
    switch (level) {
      case 'error':
        console.log(Date.now() + ' - ERROR - ' + message)
        break
      case 'warn':
        console.log(Date.now() + ' - WARN - ' + message)
        break
      case 'info':
        console.log(Date.now() + ' - INFO - ' + message)
        break
      case 'debugg':
        if (process.env.ENAGLE_DEBUGGING) {
          console.log(Date.now() + ' - DEBUGG - ' + message)
        }
        break
      default:
        console.log('LOG Level not Found: - ' + level)
        console.log('The Message was: - ' + message)
    }
  }
}
