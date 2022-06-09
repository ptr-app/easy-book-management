const mongoose = require('mongoose')
const { Schema } = mongoose

const employeeModel = new Schema({
  name: { type: String, trim: true },
  birthdate: { type: Date },
  classID: { type: [String] },
  schoolID: { type: String },
  roleID: { type: String },
})

const Employee = mongoose.model('Employee', employeeModel)

module.exports = Employee
