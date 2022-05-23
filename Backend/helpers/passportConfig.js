require('dotenv/config')
const { log } = require('../helpers/logger')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const Employee = require('../models/employeeModel')

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'loginName' },
    async (loginName, password, done) => {
      log('Helpers.passportConfig.local - Start ', 'debug')
      const user = await User.findOne({ loginName: loginName }).catch((err) => {
        log(
          'Helpers.passportConfig.local - Failed to find user: ' + err.message,
          'error'
        )
        return done(null, false, { message: err.message })
      })
      if (user === undefined) {
        log('Helpers.passportConfig.local - Cannot find user ', 'error')
        return done(null, false, { message: 'USER_NOT_FOUND' })
      } else {
        log('Helpers.passportConfig.local - Found User ', 'debug')
      }
      try {
        if (await bcrypt.compare(password, user.passwordHash)) {
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
        return done(err)
      }
    }
  )
)

passport.serializeUser(async (user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (_id, done) => {
  let user = User.findById(_id)
  return done(null, user[0])
})
