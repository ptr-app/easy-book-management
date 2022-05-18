const mongoose = require('mongoose')
const { Schema } = mongoose

const classModel = new Schema({
  name: { type: String, trim: true },
  studentsID: { type: [String] },
  employeeID: { type: String },
  schoolID: { type: String },
})

const Class = mongoose.model('Class', classModel)

module.exports = Class
