require('dotenv/config')

const { log } = require('../helpers/logger')
const apiResponse = require('../helpers/apiResponse')
const Class = require('../models/classModel')
const Employee = require('../models/employeeModel')

exports.addClass = [
  async (req, res) => {
    log('Controller.classController.addClass - Start', 'debug')
    const { name, studentID, employeeID, schoolID } = req.body
    let ClassObject = new Class({
      name,
      studentID,
      employeeID,
      schoolID,
    })
    let newClass = await ClassObject.save().catch((err) => {
      log(
        'Controller.classController.addClass - Failed to add ClassObject: ' +
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
    let ClassObject = await Class.findByIdAndUpdate(
      req.body._id,
      req.body
    ).catch((err) => {
      log(
        'Controller.classController.editClass - Failed to edit ClassObject ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })

    log('Controller.classController.editClass - End', 'debug')
    return apiResponse.successResponseWithData(res, 'CLASS_EDITED', ClassObject)
  },
]

exports.updateEmployeeID = [
  async (req, res) => {
    log('Controller.classController.updateEmployeeID - Start', 'debug')
    let employeeID
    if (req.body.employeeID !== undefined) {
      let employee = Employee.findById(req.body.employeeID).catch((err) => {
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
        'Controller.classController.updateEmployeeID - A ClassObject needs an attached Employee ',
        'error'
      )
      return apiResponse.errorResponse(res, 'CLASS_NEED_EMPLOYEE')
    }
    let ClassObject = await Class.findByIdAndUpdate(req.body._id, {
      employeeID: employeeID,
    }).catch((err) => {
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
      ClassObject
    )
  },
]

exports.deleteClass = [
  async (req, res) => {
    log('Controller.classController.deleteClass - Start ', 'debug')
    let ClassObject = Class.findById(req.body._id).catch((err) => {
      log(
        'Controller.classController.deleteClass - Failed to find class: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    if (ClassObject.studentsID.length > 1) {
      log(
        'Controller.classController.deleteClass - Failed to delete class with Students in it: ',
        'error'
      )
      return apiResponse.errorResponse(res, 'CLASS_HAS_STUDENTS')
    }
    await Class.findByIdAndDelete(req.body._id).catch((err) => {
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
    let allClass = await Class.find().catch((err) => {
      log(
        'Controller.classController.getAllClass - Failed while searching for class' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.classController.getAllClass - End', 'debug')
    return apiResponse.successResponseWithData(res, 'CLASS_FOUND_ALL', allClass)
  },
]

exports.getClassByID = [
  async (req, res) => {
    log('Controller.classController.getClassByID - Start', 'debug')
    let ClassObject = await Class.findById(req.body._id).catch((err) => {
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
    return apiResponse.successResponseWithData(
      res,
      'CLASS_FOUND_ID',
      ClassObject
    )
  },
]

exports.getClassByEmployee = [
  async (req, res) => {
    log('Controller.classController.getClassByEmployee - Start', 'debug')
    let ClassObject = await Class.find({
      employeeID: req.headers['x-employeeid'],
    }).catch((err) => {
      log(
        'Controller.classController.getClassByEmployee - Failed while searching for ClassObject with the Employee id: ' +
          req.headers['x-employeeid'] +
          '. Error Message is' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.classController.getClassByEmployee - END ', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'CLASS_FOUND_EMPLOYEE',
      ClassObject
    )
  },
]

exports.getClassBySchool = [
  async (req, res) => {
    log('Controller.classController.getClassBySchool - Start', 'debug')
    let schoolID
    if (!req.body.schoolID) {
      let employee = await Employee.findById(req.headers['x-employeeid'])
      schoolID = employee.schoolID
    } else {
      schoolID = req.headers['x-employeeid']
    }
    let ClassObject = await Class.find({ schoolID: schoolID }).catch((err) => {
      log(
        'Controller.classController.getClassBySchool - Failed while searching for ClassObject with the School id: ' +
          schoolID +
          '. Error Message is' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.classController.getClassBySchool - END ', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'CLASS_FOUND_SCHOOL',
      ClassObject
    )
  },
]
