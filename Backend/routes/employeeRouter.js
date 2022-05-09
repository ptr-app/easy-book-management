const express = require('express')
const {checkStudent, checkTeacher} = require('../middleware/index')

const employeeRouter = express.Router({
    mergeParams: true
})

module.exports.default = employeeRouter