require('dotenv/config')

const mongoose = require('mongoose')

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

