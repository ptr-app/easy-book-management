require('dotenv/config')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const userModel = require('../models/DatabaseModel')
const employeeModel = require('../models/DatabaseModel')

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'loginName' },
    async (loginName, password, done) => {
      const user = userModel.find({ loginName: loginName }).catch((err) => {
        log(
          'Helpers.passportConfig.local - Failed to find user: ' + err.message,
          'error'
        )
        return done(null, false, { message: err.message })
      })
      if (user === undefined) {
        log('Helpers.passportConfig.local - Cannot find user ', 'error')
        return done(null, false, { message: 'USER_NOT_FOUND' })
      }
      try {
        if (await bcrypt.compare(password, user.password)) {
          log(
            'Helpers.passportConfig.local - User Password was correct ',
            'debug'
          )
          return done(null, user)
        } else {
          log(
            'Helpers.passportConfig.local - User Password was incorrect ',
            'error'
          )
          return done(null, false, 'WRONG_PASSWORD')
        }
      } catch (err) {
        log(
          'Helpers.passportConfig.local - Error occured while checking Password: ' +
            err.message,
          'error'
        )
        return done(error)
      }
    }
  )
)
