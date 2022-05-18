const mongoose = require('mongoose')
const { Schema } = mongoose

const roleModel = new Schema({
  name: { type: String, trim: true },
})

const Role = mongoose.model('Role', roleModel)

module.exports = Role
