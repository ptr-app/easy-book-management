const express = require('express')
const middleware = require('../middleware/index')
const schoolController = require('../controller/schoolController')

const schoolRouter = express.Router({
  mergeParams: true,
})

schoolRouter.post(
  '/addSchool',
  middleware.checkNotLogged,
  schoolController.addSchool
)

schoolRouter.post(
  '/editSchool',
  middleware.checkDean,
  schoolController.editSchool
)

schoolRouter.delete(
  '/deleteSchool',
  middleware.checkDean,
  schoolController.deleteSchool
)

schoolRouter.get(
  '/getAllSchools',
  middleware.checkAdmin,
  schoolController.getAllSchools
)

schoolRouter.get(
  '/getSchoolByID',
  middleware.checkDean,
  schoolController.getSchoolByID
)

module.exports.default = schoolRouter
