require('dotenv/config')

const mongoose = require('mongoose')
const express = require('express')
const routes = require('./routes')

//DATABASE Connection Beginn
mongoose.connect(process.env.MONGOCONNECTIONSTRING)

mongoose.connection.on('open', () => {
    console.log("Connection established to Mongo DB")
})
mongoose.connection.on('error', (error) => {
    console.log("Could not Connect to Mongo DB")
    console.log(error)
})
//DATABASE Connection End

const app = express()

app.use('/api', routes)

app.listen(process.env.PORT, function() {
    console.log("Server started on Port ", process.env.PORT)
})