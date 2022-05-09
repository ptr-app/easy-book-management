const express = require('express')
const {checkStudent, checkTeacher} = require('../middleware/index')

const studentRouter = express.Router({
    mergeParams: true
})

module.exports.default = studentRouter