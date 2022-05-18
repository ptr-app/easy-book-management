const express = require('express')
const middleware = require('../middleware/index')
const logikController = require('../controller/logikController')

const logikRouter = express.Router({
  mergeParams: true,
})

//logikRouter.post('/advanceAllStudentsFromClass', middleware.checkTeacher, logikController.advanceAllStudentsFromClass)

//logikRouter.post('/advanceStudentFromClass', middleware.checkTeacher, logikController.advanceStudentFromClass)

//logikRouter.post('/studentChecksBookOut', middleware.checkStudent, logikController.studentChecksBookOut)

//logikRouter.post('/studentChecksBookIn', middleware.checkStudent, logikController.studentChecksBookIn)

//logikRouter.post('/changeEmployeeClass', middleware.checkTeacher, logikController.changeEmployeeClass)

//logikRouter.post('/changeTeacher', middleware.checkTeacher, logikController.changeTeacher)

module.exports.default = logikRouter
