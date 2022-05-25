const bcrypt = require('bcrypt')
const { log } = require('../helpers/logger')
const { jwtForUser } = require('../helpers/utility')
const apiResponse = require('../helpers/apiResponse')
const passport = require('passport')
const Student = require('../models/studentModel')
const User = require('../models/userModel')
const School = require('../models/schoolModel')
const Employee = require('../models/employeeModel')
const Role = require('../models/roleModel')
const Class = require('../models/classModel')

exports.login = [
  async (req, res, next) => {
    log('Controller.authController.login - Start', 'debug')
    try {
      passport.authenticate('local', function (err, user, info) {
        if (err) {
          log(
            'Controller.authController-login - Error while login' + err.message,
            'error'
          )
          return next(err)
        }
        if (!user) {
          log('Controller.authController-login - No User', 'error')
          return apiResponse.errorResponse(res, info.message)
        }
        req.logIn(user, async (err) => {
          if (err) {
            log(
              'Controller.authController-login - Error' + err.message,
              'error'
            )
            return next(err)
          }
          let user = await userData(req.user)
          log('Controller.authController.login - End', 'debug')
          return apiResponse.successResponseWithData(
            res,
            'USER_LOGGED_IN',
            user
          )
        })
      })(req, res, next)
    } catch (err) {
      log(
        'Controller.authController.login - Error while Authenticate: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    }
  },
]

exports.registerStudent = [
  async (req, res) => {
    log('Controller.authController.registerStudent - Start', 'debug')
    const { loginName, name, password, birthdate, classID } = req.body
    if (!checkClassID(classID)) {
      log(
        'Controller.authController.registerStudent - Failed to find class: ',
        'error'
      )
      return apiResponse.errorResponse(res, 'CLASS_NOT_FOUND')
    }
    let newStudentModel = new Student({
      name: name,
      birthdate: birthdate,
      classID: classID,
      bookID: null,
    })
    let newStudent = await newStudentModel.save().catch((err) => {
      log(
        'Controller.authController.registerStudent - Failed to add student: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    let passwordHash = await bcrypt.hash(password, 10)
    let newUserModel = new User({
      loginName: loginName,
      passwordHash: passwordHash,
      userID: newStudent._id,
      isStudent: true,
    })
    let correspondendClass = await Class.findById(classID)
    correspondendClass.studentsID.push(newStudent._id)
    console.log('CORRESPONDENDCLASS')
    console.log(correspondendClass)
    Class.findByIdAndUpdate(classID, correspondendClass).catch((err) => {
      log(
        'Controller.authController.registerStudent - Failed to update Class: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    let newUser = await newUserModel.save().catch((err) => {
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
    const {
      loginName,
      name,
      password,
      birthdate,
      schoolID,
      roleName,
      classID,
    } = req.body
    let role = await Role.findOne({ name: roleName })
    let newEmployeeModel = new Employee({
      name: name,
      birthdate: birthdate,
      classID: classID,
      schoolID: schoolID,
      roleID: role._id,
    })
    if (!checkSchoolID(schoolID)) {
      log(
        'Controller.authController.registerEmployee - Failed to find School: ',
        'error'
      )
      return apiResponse.errorResponse(res, 'SCHOOL_NOT_FOUND')
    }
    let newEmployee = await newEmployeeModel.save().catch((err) => {
      log(
        'Controller.authController.registerEmployee - Failed to add Employee: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    let passwordHash = await bcrypt.hash(password, 10)
    let newUserModel = new User({
      loginName: loginName,
      passwordHash: passwordHash,
      userID: newEmployee._id,
      isStudent: false,
    })
    let newUser = await newUserModel.save().catch((err) => {
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
    const { loginName, name, password, birthdate, schoolName } = req.body
    let newSchoolModel = new School({ name: schoolName, classID: null })
    let newSchool = newSchoolModel.save().catch((err) => {
      log(
        'Controller.authController.registerSchool - Failed to create School: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.authController.registerSchool - Added School', 'debug')
    let newEmployeeModel = new Employee({
      name: name,
      birthdate: birthdate,
      classID: null,
      schoolID: newSchool._id,
      roleID: process.env.DEAN_ID,
    })
    let newEmployee = await newEmployeeModel.save().catch((err) => {
      log(
        'Controller.authController.registerSchool - Failed to add Employee: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.authController.registerSchool - Added Employee', 'debug')
    let passwordHash = await bcrypt.hash(password, 10)
    let newUserModel = new User({
      loginName: loginName,
      passwordHash: passwordHash,
      userID: newEmployee._id,
      isStudent: false,
    })
    let newUser = newUserModel.save().catch((err) => {
      log(
        'Controller.authController.registerSchool - Failed to add user: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.authController.registerSchool - Added User', 'debug')
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
      return apiResponse.successResponse(res, 'USER_LOGGED_OUT')
    } catch (err) {
      log(
        'Controller.authController.logout - Failed to logout user' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    }
  },
]

//Helper Functions

async function userData(user) {
  let loggedUser = {
    _id: user.userID,
    loginName: user.loginName,
    passwordHash: user.passwordHash,
  }
  loggedUser.accessToken = jwtForUser(loggedUser)
  if (user.isStudent) {
    let student = await Student.findById(user.userID).catch((err) => {
      log(
        'Controller.employeeController.userData - Student not Found ',
        'error'
      )
      throw new Error()
    })
    if (!student) {
      log(
        'Controller.employeeController.userData - Student not Found ',
        'error'
      )
      throw new Error()
    }
    loggedUser.role = 'student'
    loggedUser.name = student.name
  } else {
    let employee = await Employee.findById(user.userID).catch((err) => {
      log(
        'Controller.employeeController.userData - Employee not Found ',
        'error'
      )
      throw new Error()
    })
    if (!employee) {
      log(
        'Controller.employeeController.userData - Employee not Found ',
        'error'
      )
      throw new Error()
    }
    loggedUser.name = employee.name
    loggedUser.role = await Role.findById(employee.roleID)
      .then((resp) => {
        return resp.name
      })
      .catch((err) => {
        log('Controller.employeeController.userData - Role not Found ', 'error')
        throw new Error()
      })
  }
  return loggedUser
}

async function checkClassID(classID) {
  let ClassObject = Class.findById(classID).catch((err) => {
    log(
      'Controller.employeeController.getEmployeeByRole - Failed to find ClassObject ' +
        err.message,
      'error'
    )
    return false
  })
  if (ClassObject === undefined) {
    log(
      'Controller.employeeController.getEmployeeByRole - Role not Found ',
      'error'
    )
    return false
  } else {
    log('Controller.employeeController.getEmployeeByRole - Role Found', 'debug')
    return true
  }
}

async function checkSchoolID(schoolID) {
  let school = await School.findById(schoolID).catch((err) => {
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
      'Controller.employeeController.getEmployeeByRole - School Found',
      'debug'
    )
    return true
  }
}
