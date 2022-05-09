const express = require('express')
const {checkStudent, checkTeacher} = require('../middleware/index')

const roleRouter = express.Router({
    mergeParams: true
})

module.exports.default = roleRouter