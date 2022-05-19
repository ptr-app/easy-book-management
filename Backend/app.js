require('dotenv/config')
require('./helpers/passportConfig')

const mongoose = require('mongoose')
const express = require('express')
const session = require('express-session')
const routes = require('./routes')
const passport = require('passport')
const initalizeDatabase = require('./helpers/initalizeDatabase')

//DATABASE Connection Beginn
mongoose.connect(process.env.MONGOCONNECTIONSTRING)

mongoose.connection.on('open', () => {
  console.log('App.Start - Connection to Database establlished ')
  initalizeDatabase.createStandardRoles()
})
mongoose.connection.on('error', (error) => {
  console.log('App.Start - Failed to Connect to Database: ' + error.message)
})
//DATABASE Connection End

const app = express()

let sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000, secure: false },
}

app.use(session(sess))

app.use('/api', routes)
app.use(passport.initialize())
app.use(passport.session())

app.listen(process.env.PORT, function () {
  console.log('App.Start - Server started on Port: ' + process.env.PORT)
})
