const express = require('express')
const {checkStudent, checkTeacher} = require('../middleware/index')

const schoolRouter = express.Router({
    mergeParams: true
})

module.exports.default = schoolRouter