const mongoose = require('mongoose')
const { Schema } = mongoose

const classModel = new Schema({
  name: { type: String, trim: true },
  studentsID: { type: [String] },
  employeeID: { type: String, trim: true },
  schoolID: { type: String, trim: true },
})

const Class = mongoose.model('Class', classModel)

module.exports = Class
