const express = require('express')
const {checkStudent, checkTeacher} = require('../middleware/index')

const classRouter = express.Router({
    mergeParams: true
})

module.exports.default = classRouter