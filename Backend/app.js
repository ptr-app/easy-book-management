require('dotenv/config')
require('./helpers/passportConfig')

const mongoose = require('mongoose')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const routes = require('./routes')
const initalizeDatabase = require('./helpers/initalizeDatabase')
const { log } = require('./helpers/logger')

//DATABASE Connection Beginn
mongoose.connect(process.env.MONGOCONNECTIONSTRING)

mongoose.connection.on('open', () => {
  log('App.Start - Connection to Database establlished ', 'info')
  initalizeDatabase.createStandardRoles()
})
mongoose.connection.on('error', (error) => {
  log('App.Start - Failed to Connect to Database: ' + error.message, 'error')
})
//DATABASE Connection End

const app = express()

let sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000, secure: true },
}

app.set('trust proxy', true)

app.disable('x-powered-by')

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(session(sess))
app.use(passport.initialize())
app.use(passport.session())
app.use('/api', routes)

app.listen(process.env.PORT, function () {
  log('App.Start - Server started on Port: ' + process.env.PORT, 'info')
})
