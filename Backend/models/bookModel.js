const mongoose = require('mongoose')
const { Schema } = mongoose

const bookModel = new Schema({
  name: { type: String, trim: true },
  author: { type: String, trim: true },
  releaseDate: { type: Date },
  genre: { type: String },
  comment: { type: String },
  studentID: { type: [String] },
})

const Book = mongoose.model('Book', bookModel)

module.exports = Book
