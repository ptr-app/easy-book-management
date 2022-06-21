const mongoose = require('mongoose')
const { Schema } = mongoose

const schoolModel = new Schema({
  name: { type: String, trim: true },
  classID: [String],
})

const School = mongoose.model('School', schoolModel)

module.exports = School
