require('dotenv/config')

const { log } = require('../helpers/logger')
const apiResponse = require('../helpers/apiResponse')
const Class = require('../models/classModel')
const Employee = require('../models/employeeModel')
const School = require('../models/schoolModel')

exports.addClass = [
  async (req, res) => {
    log('Controller.classController.addClass - Start', 'debug')
    let employee = await Employee.findById(req.headers['x-employeeid'])
    let ClassObject = new Class({
      name: req.body.name,
      studentID: null,
      employeeID: req.body.employeeID,
      schoolID: employee.schoolID,
    })
    let newClass = await ClassObject.save().catch((err) => {
      log(
        'Controller.classController.addClass - Failed to add ClassObject: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    let school = await School.findById(employee.schoolID)
    school.classID.push(newClass._id)
    await School.findByIdAndUpdate(employee.schoolID, school)
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
    if (req.body.newEmployeeID !== undefined) {
      let employee = await Employee.findById(req.body.newEmployeeID).catch(
        (err) => {
          log(
            'Controller.classController.updateEmployeeID - Failed to find Employee ' +
              err.message,
            'error'
          )
          return apiResponse.errorResponse(res, err.message)
        }
      )
      if (employee.roleID === process.env.TEACHER_ID) {
        employeeID = req.body.newEmployeeID
      } else {
        log(
          'Controller.classController.updateEmployeeID - given Employee is not an Teacher ',
          'error'
        )
        return apiResponse.errorResponse(res, 'CLASS_NOT_A_TEACHER')
      }
    } else {
      log(
        'Controller.classController.updateEmployeeID - A ClassObject needs an attached Employee ',
        'error'
      )
      return apiResponse.errorResponse(res, 'CLASS_NEED_EMPLOYEE')
    }
    let ClassObject = await Class.findByIdAndUpdate(req.body.classID, {
      employeeID: employeeID,
    }).catch((err) => {
      log(
        'Controller.classController.updateEmployeeID - Failed to update Class ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    await Employee.findByIdAndUpdate(req.body.newEmployeeID, {
      classID: req.body.classID,
    }).catch((err) => {
      log(
        'Controller.classController.updateEmployeeID - Failed to update NewEmployee ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    if (req.body.oldEmployeeID) {
      await Employee.findByIdAndUpdate(req.body.oldEmployeeID, {
        classID: '',
      }).catch((err) => {
        log(
          'Controller.classController.updateEmployeeID - Failed to update OldEmployee ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })
    }

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
    let ClassObject = await Class.findById(req.body.classID).catch((err) => {
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
    await Class.findByIdAndDelete(req.body.classID).catch((err) => {
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
      schoolID = req.headers['x-schoolid']
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
    let returnClass = await mergeEmployeeIDToName(ClassObject).catch((err) => {
      log(
        'Controller.classController.getClassBySchool - Failed while trying to merge EmployeeID with Name: ' +
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
      returnClass
    )
  },
]

//HELPER FUNCTIONS

async function mergeEmployeeIDToName(Class) {
  let classes = []
  for (let i = 0; i < Class.length; i++) {
    let employee = await Employee.findById(Class[i].employeeID).catch((err) => {
      log(
        'Controller.classController.mergeEmployeeIDToName - Failed to find EmployeeID: ' +
          Class[i].employeeID +
          '. Error Message is' +
          err.message,
        'error'
      )
    })
    classes.push({
      _id: Class[i]._id,
      name: Class[i].name,
      studentsID: Class[i].studentsID,
      employeeID: Class[i].employeeID,
      teacherName: employee ? employee.name : '',
      schoolID: Class[i].schoolID,
    })
  }
  return classes
}
