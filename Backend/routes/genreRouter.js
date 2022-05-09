const express = require('express')
const {checkStudent, checkTeacher} = require('../middleware/index')

const genreRouter = express.Router({
    mergeParams: true
})

module.exports.default = genreRouter