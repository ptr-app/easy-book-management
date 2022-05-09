const express = require('express')
const {checkStudent, checkTeacher} = require('../middleware/index')

const bookRouter = express.Router({
    mergeParams: true
})

module.exports.default = bookRouter