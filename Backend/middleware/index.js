const jwt = require('jsonwebtoken')
const {log} = require('../helpers/logger')
const apiResponse = require('../helpers/apiResponse')
const { Student, Employee } = require('../models/employeeModel')

exports.checkLogged = [
  (req, res, next) => {
    log('Middleware.index.checkLogged - Start: ', 'debug')
    let token = req.headers['x-access-token']
    jwt.verify(token, process.env.JWT_SECRET, (error) => {
      if (error) {
        log(
          'Middleware.index.checkLogged - Error while checking JWT Verify: ' +
            error.message,
          'error'
        )
        return apiResponse.unathorizedResponse(res, 'MISSING_SESSION')
      } else {
        log('Middleware.index.checkLogged - End: ', 'debug')
        next()
      }
    })
  },
]

exports.checkNotLogged = [
  (req, res, next) => {
    log('Middleware.index.checkNotLogged - Start: ', 'debug')
    let token = req.headers['x-access-token']
    if (token || req.isAuthenticated()) {
      log(
        'Middleware.index.checkNotLogged - User was already logged in: ',
        'error'
      )
      return res.redirect('/home')
    } else {
      log('Middleware.index.checkNotLogged - End: ', 'debug')
      next()
    }
  },
]

exports.checkStudent = [
  async (req, res, next) => {
    log('Middleware.index.checkStudent - Start: ', 'debug')
    let studentID = res.headers['x-studentID']
    let student = await Student.findById(studentID)
    if (student !== undefined) {
      log('Middleware.index.checkStudent - End: ', 'debug')
      next()
    } else {
      log(
        'Middleware.index.checkStudent - Could not find Student with that StudentID: ' +
          studentID,
        'error'
      )
      return apiResponse.unathorizedResponse(res, 'UNKNOWN_STUDENT')
    }
  },
]

exports.checkTeacher = [
  async (req, res, next) => {
    log('Middleware.index.checkTeacher - Start: ', 'debug')
    let employeeID = res.headers['x-employeeID']
    let employee = await Employee.findById(employeeID)
    if (employee === undefined) {
      log(
        'Middleware.index.checkTeacher - Could not find Employee with that EmployeeID: ' +
          employeeID,
        'error'
      )
      return apiResponse.unathorizedResponse(res, 'UNKNOWN_EMPLOYEE')
    } else {
      let roleID = employee.roleID
      if (roleID === env.process.TEACHER_ID || roleID === env.process.DEAN_ID) {
        log('Middleware.index.checkTeacher - End: ', 'debug')
        next()
      } else {
        log(
          'Middleware.index.checkTeacher - The Employee had not an Teacher ID or an Dean ID. The ID was: ' +
            roleID,
          'error'
        )
        return apiResponse.unathorizedResponse(res, 'NOT_A_TEACHER')
      }
    }
  },
]

exports.checkDean = [
  async (req, res, next) => {
    log('Middleware.index.checkDean - Start: ', 'debug')
    let employeeID = res.headers['x-employeeID']
    let employee = await Employee.findById(employeeID)
    if (employee === undefined) {
      log(
        'Middleware.index.checkDean - Could not find Employee with that EmployeeID: ' +
          employeeID,
        'error'
      )
      return apiResponse.unathorizedResponse(res, 'UNKNOWN_EMPLOYEE')
    } else {
      let roleID = employee.roleID
      if (roleID === env.process.DEAN_ID) {
        log('Middleware.index.checkDean - End: ', 'debug')
        next()
      } else {
        log(
          'Middleware.index.checkDean - The Employee had not an Dean ID. The ID was: ' +
            roleID,
          'error'
        )
        return apiResponse.unathorizedResponse(res, 'NOT_A_DEAN')
      }
    }
  },
]

exports.checkAdmin = [
  async (req, res, next) => {
    log('Middleware.index.checkAdmin - Start: ', 'debug')
    let employeeID = res.headers['x-employeeID']
    let employee = await Employee.findById(employeeID)
    if (employee === undefined) {
      log(
        'Middleware.index.checkAdmin - Could not find Employee with that EmployeeID: ' +
          employeeID,
        'error'
      )
      return apiResponse.unathorizedResponse(res, 'UNKNOWN_EMPLOYEE')
    } else {
      let roleID = employee.roleID
      if (roleID === env.process.DEAN_ID) {
        log('Middleware.index.checkAdmin - End: ', 'debug')
        next()
      } else {
        log(
          'Middleware.index.checkAdmin - The Employee had not an Admin ID. The ID was: ' +
            roleID,
          'error'
        )
        return apiResponse.unathorizedResponse(res, 'NOT_A_ADMIN')
      }
    }
  },
]
