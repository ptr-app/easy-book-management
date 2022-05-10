require('dotenv/config')

const mongoose = require('mongoose')
const express = require('express')
const routes = require('./routes')

//DATABASE Connection Beginn
mongoose.connect(process.env.MONGOCONNECTIONSTRING)

mongoose.connection.on('open', () => {
  log('App.Start - Connection to Database establlished ', 'info')
})
mongoose.connection.on('error', (error) => {
  log('App.Start - Failed to Connect to Database: ' + error.message, 'error')
})
//DATABASE Connection End

const app = express()

app.use('/api', routes)

app.listen(process.env.PORT, function () {
  log('App.Start - Server started on Port: ' + process.env.PORT, 'info')
})
