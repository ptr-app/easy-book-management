const mongoose = require('mongoose')
const { Schema } = mongoose

const studentModel = new Schema({
  name: { type: String, trim: true },
  birthdate: { type: Date },
  classID: { type: String },
  bookID: { type: [String] },
})

const Student = mongoose.model('Student', studentModel)

module.exports = Student
