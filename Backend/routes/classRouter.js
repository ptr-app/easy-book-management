const express = require('express')
const middleware = require('../middleware/index')
const classController = require('../controller/classController')

const classRouter = express.Router({
  mergeParams: true,
})

classRouter.post('/addClass', middleware.checkTeacher, classController.addClass)

classRouter.post(
  '/editClass',
  middleware.checkTeacher,
  classController.editClass
)

classRouter.post(
  '/updateEmployeeID',
  middleware.checkDean,
  classController.updateEmployeeID
)

classRouter.delete(
  '/deleteClass',
  middleware.checkTeacher,
  classController.deleteClass
)

classRouter.get(
  '/getAllClass',
  middleware.checkAdmin,
  classController.getAllClass
)

classRouter.get(
  '/getClassByID',
  middleware.checkTeacher,
  classController.getClassByID
)

classRouter.get(
  '/getClassByEmployee',
  middleware.checkTeacher,
  classController.getClassByEmployee
)

classRouter.get(
  '/getClassBySchool',
  middleware.checkDean,
  classController.getClassBySchool
)

module.exports.default = classRouter
