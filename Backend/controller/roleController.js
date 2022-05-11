const log = require('../helpers/logger')
const apiResponse = require('../helpers/apiResponse')
const roleModel = require('../models/DatabaseModel')
const employeeModel = require('../models/DatabaseModel')

exports.addRole = [
  async (req, res) => {
    log('Controller.roleController.addRole - Start', 'debug')
    const { name } = req.body
    let role = new roleModel({
      name,
    })
    let newRole = await role.save().catch((err) => {
      log(
        'Controller.roleController.addRole - Failed to add role: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.roleController.addRole - End', 'debug')
    return apiResponse.successResponseWithData(res, 'ROLE_CREATED', newRole)
  },
]

exports.editRole = [
  async (req, res) => {
    log('Controller.roleController.editRole - Start', 'debug')
    let role = await roleModel
      .findByIdAndUpdate(req.body._id, req.body)
      .catch((err) => {
        log(
          'Controller.roleController.editRole - Failed to edit Role ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })

    log('Controller.roleController.editRole - End', 'debug')
    return apiResponse.successResponseWithData(res, 'ROLE_EDITED', role)
  },
]

exports.deleteRole = [
  async (req, res) => {
    log('Controller.roleController.deleteRole - Start ', 'debug')
    let employee = employeeModel.find({ roleID: req.body._id }).catch((err) => {
      log(
        'Controller.roleController.deleteRole - Failed to find employee: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    if (employee.length > 0) {
      log(
        'Controller.roleController.deleteRole - Failed to delete role with Employee attached to it: ',
        'error'
      )
      return apiResponse.errorResponse(res, 'ROLE_HAS_EMPLOYEE')
    }
    await roleModel.findByIdAndDelete(req.body._id).catch((err) => {
      log(
        'Controller.roleController.deleteRole - Failed to delete role: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })

    log('Controller.roleController.deleteRole - End', 'debug')
    return apiResponse.successResponse(res, 'ROLE_DELETED')
  },
]

exports.getAllRoles = [
  async (req, res) => {
    log('Controller.roleController.getAllRoles - Start', 'debug')
    let allRoles = await roleModel.find().catch((err) => {
      log(
        'Controller.roleController.getAllRoles - Failed while searching for Roles' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.roleController.getAllRoles - End', 'debug')
    return apiResponse.successResponseWithData(res, 'ROLES_FOUND', allRoles)
  },
]

exports.getRoleByID = [
  async (req, res) => {
    log('Controller.roleController.getRoleByID - Start', 'debug')
    let role = await roleModel.findById(req.body._id).catch((err) => {
      log(
        'Controller.roleController.getRoleByID - Failed while searching for the role with the id: ' +
          req.body._id +
          '. Error Message is' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.roleController.getRoleByID - END ', 'debug')
    return apiResponse.successResponseWithData(res, 'ROLE_FOUND', role)
  },
]
