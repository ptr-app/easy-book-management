require('dotenv/config')
require('./helpers/passportConfig')

const mongoose = require('mongoose')
const express = require('express')
const routes = require('./routes')
const passport = require('passport')

//DATABASE Connection Beginn
mongoose.connect(process.env.MONGOCONNECTIONSTRING)

mongoose.connection.on('open', () => {
  console.log('App.Start - Connection to Database establlished ')
})
mongoose.connection.on('error', (error) => {
  console.log('App.Start - Failed to Connect to Database: ' + error.message)
})
//DATABASE Connection End

const app = express()

app.use('/api', routes)
app.use(passport.initialize())
app.use(passport.session())

app.listen(process.env.PORT, function () {
  console.log('App.Start - Server started on Port: ' + process.env.PORT)
})
