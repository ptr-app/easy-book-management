const mongoose = require('mongoose')
const { Schema } = mongoose

const userModel = new Schema({
  loginName: { type: String, trim: true },
  passwordHash: { type: String, trim: true },
  userID: { type: String, trime: true },
})

const User = mongoose.model('User', userModel)

module.exports = User
