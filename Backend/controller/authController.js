const log = require('../helpers/logger')
const apiResponse = require('../helpers/apiResponse')
const passport = require('passport')
const Student = require('../models/studentModel')
const User = require('../models/userModel')

exports.login = [
  async (req, res, next) => {
    log('Controller.authController.login - Start', 'debug')
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err)
      }
      if (!user) {
        return apiResponse.errorResponse(res, info.message)
      }
      req.logIn(user, async (err) => {
        if (err) {
          return next(err)
        }
        let user = await userData(req.user)
        log('Controller.authController.login - End', 'debug')
        return apiResponse.successResponseWithData(res, 'USER_LOGGED_IN', user)
      })
    })
  },
]

exports.registerStudent = [
  async (req, res) => {
    log('Controller.authController.registerStudent - Start', 'debug')
    const { loginName, name, password, birthdate, classID } = req.body
    if(!checkClassID(classID)) {
      log(
        'Controller.authController.registerStudent - Failed to find class: ',
        'error'
      )
      return apiResponse.errorResponse(res, "CLASS_NOT_FOUND")
    }
    let newStudentModel = new Student(name, birthdate, classID, null)
    let newStudent = await newStudentModel.save().catch((err) => {
      log(
        'Controller.authController.registerStudent - Failed to add student: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    let passwordHash = bcrypt.hash(password, 10)
    let newUserModel = new User(loginName, passwordHash, newStudent._id)
    let newUser = newUserModel.save().catch((err) => {
      log(
        'Controller.authController.registerStudent - Failed to add user: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.authController.registerStudent - End ', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'REGISTERED_STUDENT',
      newUser
    )
  },
]

exports.registerEmployee = [
  async (req, res) => {
    log('Controller.authController.registerEmployee - Start', 'debug')
    const { loginName, name, password, birthdate, schoolID, roleID } = req.body
    let newEmployeeModel = new Employee(
      name,
      birthdate,
      null,
      schoolID,
      roleID
    )
    if(!checkSchoolID(schoolID)) {
      log(
        'Controller.authController.registerEmployee - Failed to find School: ',
        'error'
      )
      return apiResponse.errorResponse(res, "SCHOOL_NOT_FOUND")
    }
    let newEmployee = await newEmployeeModel.save().catch((err) => {
      log(
        'Controller.authController.registerEmployee - Failed to add Employee: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    let passwordHash = bcrypt.hash(password, 10)
    let newUserModel = new User(loginName, passwordHash, newEmployee._id)
    let newUser = newUserModel.save().catch((err) => {
      log(
        'Controller.authController.registerEmployee - Failed to add user: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.authController.registerEmployee - End ', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'REGISTERED_EMPLOYEE',
      newUser
    )
  },
]

exports.registerSchool = [
  async (req, res) => {
    log('Controller.authController.registerSchool - Start', 'debug')
    const { loginName, name, password, birthdate } = req.body
    let newSchoolModel = new School(name, null)
    let newSchool = newSchoolModel.save().catch((err) => {
      log(
        'Controller.authController.registerSchool - Failed to create School: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    let newEmployeeModel = new Employee(
      name,
      birthdate,
      null,
      newSchool._id,
      process.env.DEAN_ID
    )
    let newEmployee = await newEmployeeModel.save().catch((err) => {
      log(
        'Controller.authController.registerSchool - Failed to add Employee: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    let passwordHash = bcrypt.hash(password, 10)
    let newUserModel = new User(loginName, passwordHash, newEmployee._id)
    let newUser = newUserModel.save().catch((err) => {
      log(
        'Controller.authController.registerSchool - Failed to add user: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.authController.registerSchool - End ', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'REGISTERED_SCHOOL',
      newUser
    )
  },
]

exports.forgotPassword = [
  async (req, res) => {
    log('Controller.authController.forgotPassword - Start', 'debug')

  },
]

exports.logout = [
  async (req, res) => {
    log('Controller.authController.logout - Start', 'debug')    
    try {
      req.logout()
      log('Controller.authController.logout - END', 'debug')
      return apiResponse.successResponse(res, "USER_LOGGED_OUT")
    } catch (err){
      log('Controller.authController.logout - Failed to logout user' + err.message, 'error')
      return apiResponse.errorResponse(res, err.message)
    }
  },
]

//Helper Functions

async function userData(user) {
  let loggedUser = {
    _id: user._id,
    loginName: user.loginName,
    passwordHash: user.passwordHash,
  }
  loggedUser.accessToken = jwtForUser(loggedUser)
  return loggedUser
},

async function checkClassID(classID){
  let ClassObject = Class.findById(req.body.classID).catch((err) => {
    log(
      'Controller.employeeController.getEmployeeByRole - Failed to find ClassObject ' +
        err.message,
      'error'
    )
    return flase
  })
  if (ClassObject === undefined) {
    log(
      'Controller.employeeController.getEmployeeByRole - Role not Found ',
      'error'
    )
    return false
  } else {
    log(
      'Controller.employeeController.getEmployeeByRole - Role Found' ,
      'debug'
    )
    return true
  }
}

async function checkSchoolID(schoolID){
  let school = School.findById(req.body.schoolID).catch((err) => {
    log(
      'Controller.employeeController.getEmployeeByRole - Failed to find School ' +
        err.message,
      'error'
    )
    return flase
  })
  if (school === undefined) {
    log(
      'Controller.employeeController.getEmployeeByRole - School not Found ',
      'error'
    )
    return false
  } else {
    log(
      'Controller.employeeController.getEmployeeByRole - School Found' ,
      'debug'
    )
    return true
  }
}