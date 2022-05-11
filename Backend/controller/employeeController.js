const bcrypt = require('bcrypt')
const log = require('../helpers/logger')
const apiResponse = require('../helpers/apiResponse')
const employeeModel = require('../models/DatabaseModel')
const roleModel = require('../models/DatabaseModel')

exports.addEmployee = [
  async (req, res) => {
    log('Controller.employeeController.addEmployee - Start', 'debug')
    const { name, password, birthdate, classID, roleID } = req.body
    let empoloyee = new employeeModel({
      name,
      password,
      birthdate,
      classID,
      roleID,
    })
    let newEmployee = await empoloyee.save().catch((err) => {
      log(
        'Controller.employeeController.addEmployee - Failed to add empoloyee: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.employeeController.addEmployee - End', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'EMPLOYEE_CREATED',
      newEmployee
    )
  },
]

exports.editEmployee = [
  async (req, res) => {
    log('Controller.employeeController.editEmployee - Start', 'debug')
    let passwordHash = await bcrypt.hash(req.body.password, 10)
    delete req.body.password
    delete req.body.classID
    delete req.body.roleID
    req.body.passwordHash = passwordHash
    let employee = await employeeModel
      .findByIdAndUpdate(req.body._id, req.body)
      .catch((err) => {
        log(
          'Controller.employeeController.editEmployee - Failed to edit Employee ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })

    log('Controller.employeeController.editEmployee - End', 'debug')
    return apiResponse.successResponseWithData(res, 'EMPLOYEE_EDITED', Class)
  },
]

exports.updateClassID = [
  async (req, res) => {
    log('Controller.employeeController.updateClassID - Start', 'debug')
    let classID
    if (req.body.classID !== undefined) {
      classID = req.body.classID
    } else {
      classID = null
    }
    let employee = await employeeModel
      .findByIdAndUpdate(req.body._id, { classID: classID })
      .catch((err) => {
        log(
          'Controller.employeeController.updateClassID - Failed to update Employee ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })

    log('Controller.employeeController.updateClassID - End', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'EMPLOYEE_ASSIGNED_CLASS',
      book
    )
  },
]

exports.updateRoleID = [
  async (req, res) => {
    log('Controller.employeeController.updateRoleID - Start', 'debug')
    let roleID
    if (req.body.roleID !== undefined) {
      roleModel.findById(req.body.roleID).catch((err) => {
        log(
          'Controller.employeeController.updateRoleID - Failed to find Role ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })
      roleID = req.body.roleID
    } else {
      roleID = null
    }
    let employee = await employeeModel
      .findByIdAndUpdate(req.body._id, { roleID: roleID })
      .catch((err) => {
        log(
          'Controller.employeeController.updateRoleID - Failed to update Employee ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })

    log('Controller.employeeController.updateRoleID - End', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'EMPLOYEE_ASSIGNED_ROLE',
      employee
    )
  },
]

exports.deleteEmployee = [
  async (req, res) => {
    log('Controller.employeeController.deleteEmployee - Start ', 'debug')
    let employee = employeeModel.findById(req.body.id).catch((err) => {
      log(
        'Controller.employeeController.deleteEmployee - Failed to find employee: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    if (employee.classID !== null) {
      log(
        'Controller.employeeController.deleteEmployee - Failed to delete employee with Class attached to it: ',
        'error'
      )
      return apiResponse.errorResponse(res, 'EMPLOYEE_HAS_CLASS')
    }
    await employeeModel.findByIdAndDelete(req.body.id).catch((err) => {
      log(
        'Controller.employeeController.deleteEmployee - Failed to delete class: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })

    log('Controller.employeeController.deleteEmployee - End', 'debug')
    return apiResponse.successResponse(res, 'EMPLOYEE_DELETED')
  },
]

exports.getAllEmployee = [
  async (req, res) => {
    log('Controller.employeeController.getAllEmployee - Start', 'debug')
    let allEmployee = await employeeModel.find().catch((err) => {
      log(
        'Controller.employeeController.getAllEmployee - Failed while searching for Employees' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.employeeController.getAllEmployee - End', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'EMPLOYEES_FOUND',
      allEmployee
    )
  },
]

exports.getEmployeeByID = [
  async (req, res) => {
    log('Controller.employeeController.getEmployeeByID - Start', 'debug')
    let employee = await employeeModel.findById(req.body._id).catch((err) => {
      log(
        'Controller.employeeController.getEmployeeByID - Failed while searching for the employee with the id: ' +
          req.body._id +
          '. Error Message is' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.employeeController.getEmployeeByID - END ', 'debug')
    return apiResponse.successResponseWithData(res, 'EMPLOYEE_FOUND', employee)
  },
]

exports.getEmployeeByRole = [
  async (req, res) => {
    log('Controller.employeeController.getEmployeeByRole - Start', 'debug')
    let roleID
    roleModel.findById(req.body.roleID).catch((err) => {
      log(
        'Controller.employeeController.getEmployeeByRole - Failed to find Role ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    roleID = req.body.roleID

    let employee = await employeeModel
      .find({ roleID: req.body.roleID })
      .catch((err) => {
        log(
          'Controller.employeeController.getEmployeeByRole - Failed while searching for employee with the role id: ' +
            req.body.employeeID +
            '. Error Message is' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })
    log('Controller.employeeController.getEmployeeByRole - END ', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'EMPLOYEE_FOUND_ROLE',
      employee
    )
  },
]
