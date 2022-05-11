const express = require('express')
const middleware = require('../middleware/index')
const roleController = require('../controller/roleController')

const roleRouter = express.Router({
  mergeParams: true,
})

classRouter.post('/addRole', middleware.checkDean, roleController.addRole)

classRouter.post('/editRole', middleware.checkDean, roleController.editRole)

classRouter.delete(
  '/deleteRole',
  middleware.checkDean,
  roleController.deleteRole
)

classRouter.get(
  '/getAllRoles',
  middleware.checkTeacher,
  roleController.getAllRoles
)

classRouter.get(
  '/getRoleByID',
  middleware.checkTeacher,
  roleController.getRoleByID
)

module.exports.default = roleRouter
