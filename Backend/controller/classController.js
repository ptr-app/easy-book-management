require('dotenv/config')

const log = require('../helpers/logger')
const apiResponse = require('../helpers/apiResponse')
const classModel = require('../models/DatabaseModel')
const employeeModel = require('../models/DatabaseModel')

exports.addClass = [
  async (req, res) => {
    log('Controller.classController.addClass - Start', 'debug')
    const { name, studentID, employeeID, schoolID } = req.body
    let Class = new classModel({
      name,
      studentID,
      employeeID,
      schoolID,
    })
    let newClass = await Class.save().catch((err) => {
      log(
        'Controller.classController.addClass - Failed to add Class: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.classController.addClass - End', 'debug')
    return apiResponse.successResponseWithData(res, 'CLASS_CREATED', newClass)
  },
]

exports.editClass = [
  async (req, res) => {
    log('Controller.classController.editClass - Start', 'debug')
    delete req.body.employeeID
    let Class = await classModel
      .findByIdAndUpdate(req.body._id, req.body)
      .catch((err) => {
        log(
          'Controller.classController.editClass - Failed to edit Class ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })

    log('Controller.classController.editClass - End', 'debug')
    return apiResponse.successResponseWithData(res, 'CLASS_EDITED', Class)
  },
]

exports.updateEmployeeID = [
  async (req, res) => {
    log('Controller.classController.updateEmployeeID - Start', 'debug')
    let employeeID
    if (req.body.employeeID !== undefined) {
      let employee = employeeModel
        .findById(req.body.employeeID)
        .catch((err) => {
          log(
            'Controller.classController.updateEmployeeID - Failed to find Employee ' +
              err.message,
            'error'
          )
          return apiResponse.errorResponse(res, err.message)
        })
      if (employee._id === process.env.TEACHER_ID) {
        employeeID = req.body.employeeID
      } else {
        log(
          'Controller.classController.updateEmployeeID - given Employee is not an Teacher ',
          'error'
        )
        return apiResponse.errorResponse(res, 'NOT_A_TEACHER')
      }
    } else {
      log(
        'Controller.classController.updateEmployeeID - A Class needs an attached Employee ',
        'error'
      )
      return apiResponse.errorResponse(res, 'CLASS_NEED_EMPLOYEE')
    }
    let Class = await classModel
      .findByIdAndUpdate(req.body._id, { employeeID: employeeID })
      .catch((err) => {
        log(
          'Controller.classController.updateEmployeeID - Failed to update Student ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })

    log('Controller.classController.updateEmployeeID - End', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'CLASS_ASSIGNED_EMPLOYEE',
      Class
    )
  },
]

exports.deleteClass = [
  async (req, res) => {
    log('Controller.classController.deleteClass - Start ', 'debug')
    await classModel.findByIdAndDelete(req.body.id).catch((err) => {
      log(
        'Controller.classController.deleteClass - Failed to delete class: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })

    log('Controller.classController.deleteClass - End', 'debug')
    return apiResponse.successResponse(res, 'CLASS_DELETED')
  },
]

exports.getAllClass = [
  async (req, res) => {
    log('Controller.classController.getAllClass - Start', 'debug')
    let allClass = await classModel.find().catch((err) => {
      log(
        'Controller.classController.getAllClass - Failed while searching for class' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.classController.getAllClass - End', 'debug')
    return apiResponse.successResponseWithData(res, 'CLASS_FOUND', allClass)
  },
]

exports.getClassByID = [
  async (req, res) => {
    log('Controller.classController.getClassByID - Start', 'debug')
    let Class = await classModel.findById(req.body._id).catch((err) => {
      log(
        'Controller.classController.getClassByID - Failed while searching for the class with the id: ' +
          req.body._id +
          '. Error Message is' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.classController.getClassByID - END ', 'debug')
    return apiResponse.successResponseWithData(res, 'CLASS_FOUND', Class)
  },
]

exports.getClassByTeacher = [
  async (req, res) => {
    log('Controller.classController.getClassByTeacher - Start', 'debug')
    let Class = await classModel
      .find({ employeeID: req.body.employeeID })
      .catch((err) => {
        log(
          'Controller.classController.getClassByTeacher - Failed while searching for Class with the Employee id: ' +
            req.body.employeeID +
            '. Error Message is' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })
    log('Controller.classController.getClassByTeacher - END ', 'debug')
    return apiResponse.successResponseWithData(res, 'Class found', Class)
  },
]
