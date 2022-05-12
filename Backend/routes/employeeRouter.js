const express = require('express')
const middleware = require('../middleware/index')
const employeeController = require('../controller/employeeController')

const employeeRouter = express.Router({
  mergeParams: true,
})

employeeRouter.post(
  '/addEmployee',
  middleware.checkDean,
  employeeController.addEmployee
)

employeeRouter.post(
  '/editEmployee',
  middleware.checkTeacher,
  employeeController.editEmployee
)

employeeRouter.post(
  '/updateClassID',
  middleware.checkTeacher,
  employeeController.updateClassID
)

employeeRouter.post(
  '/updateRoleID',
  middleware.checkDean,
  employeeController.updateRoleID
)

employeeRouter.delete(
  '/deleteEmployee',
  middleware.checkDean,
  employeeController.deleteEmployee
)

employeeRouter.get(
  '/getAllEmployee',
  middleware.checkDean,
  employeeController.getAllEmployee
)

employeeRouter.get(
  '/getEmployeeByID',
  middleware.checkDean,
  employeeController.getEmployeeByID
)

employeeRouter.get(
  '/getEmployeeByRole',
  middleware.checkDean,
  employeeController.getEmployeeByRole
)

employeeRouter.get(
  '/getEmployeeBySchool',
  middleware.checkDean,
  employeeController.getEmployeeBySchool
)

module.exports.default = employeeRouter
