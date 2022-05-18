const express = require('express')
const middleware = require('../middleware/index')
const roleController = require('../controller/roleController')

const roleRouter = express.Router({
  mergeParams: true,
})

roleRouter.post('/addRole', middleware.checkDean, roleController.addRole)

roleRouter.post('/editRole', middleware.checkDean, roleController.editRole)

roleRouter.delete(
  '/deleteRole',
  middleware.checkDean,
  roleController.deleteRole
)

roleRouter.get(
  '/getAllRoles',
  middleware.checkTeacher,
  roleController.getAllRoles
)

roleRouter.get(
  '/getRoleByID',
  middleware.checkTeacher,
  roleController.getRoleByID
)

module.exports.default = roleRouter
