const mongoose = require('mongoose')
const { Schema } = mongoose

const genreModel = new Schema({
  name: { type: String, trim: true },
})

const Genre = mongoose.model('Genre', genreModel)

module.exports = Genre
