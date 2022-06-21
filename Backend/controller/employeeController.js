const { log } = require('../helpers/logger')
const ObjectId = require('mongoose').Types.ObjectId
const apiResponse = require('../helpers/apiResponse')
const Employee = require('../models/employeeModel')
const Role = require('../models/roleModel')
const School = require('../models/schoolModel')
const Class = require('../models/classModel')
const User = require('../models/userModel')

exports.addEmployee = [
  async (req, res) => {
    log('Controller.employeeController.addEmployee - Start', 'debug')
    const { name, birthdate, classID, schoolID, roleID } = req.body
    let empoloyee = new Employee({
      name,
      birthdate,
      classID,
      schoolID,
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
    const { name, birthdate } = req.body
    let employee = await Employee.findByIdAndUpdate(req.body._id, {
      name: name,
      birthdate: birthdate,
    }).catch((err) => {
      log(
        'Controller.employeeController.editEmployee - Failed to edit Employee ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })

    log('Controller.employeeController.editEmployee - End', 'debug')
    return apiResponse.successResponseWithData(res, 'EMPLOYEE_EDITED', employee)
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
    let employee = await Employee.findByIdAndUpdate(req.body._id, {
      classID: classID,
    }).catch((err) => {
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
      Role.findById(req.body.roleID).catch((err) => {
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
    let employee = await Employee.findByIdAndUpdate(req.body._id, {
      roleID: roleID,
    }).catch((err) => {
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
    let employee = Employee.findById(req.body.employeeID).catch((err) => {
      log(
        'Controller.employeeController.deleteEmployee - Failed to find employee: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    if (employee.classID !== undefined && employee.classID !== null) {
      log(
        'Controller.employeeController.deleteEmployee - Failed to delete employee with Class attached to it: ',
        'error'
      )
      return apiResponse.errorResponse(res, 'EMPLOYEE_HAS_CLASS')
    }
    await Employee.findByIdAndDelete(req.body.employeeID).catch((err) => {
      log(
        'Controller.employeeController.deleteEmployee - Failed to delete class: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    await User.findOneAndDelete({ userID: req.body.employeeID }).catch(
      (err) => {
        log(
          'Controller.employeeController.deleteEmployee - Failed to delete user: ' +
            err.message,
          'error'
        )
      }
    )

    log('Controller.employeeController.deleteEmployee - End', 'debug')
    return apiResponse.successResponse(res, 'EMPLOYEE_DELETED')
  },
]

exports.getAllEmployee = [
  async (req, res) => {
    log('Controller.employeeController.getAllEmployee - Start', 'debug')
    let allEmployee = await Employee.find().catch((err) => {
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
    let employee = await Employee.findById(req.body._id).catch((err) => {
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
    if (!ObjectId.isValid(req.params.role)) {
      let role = await Role.findOne({ name: req.params.role }).catch((err) => {
        log(
          'Controller.employeeController.getEmployeeByRole - Failed to find Role By Name' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })
      roleID = role._id
    } else if (checkID === new ObjectId(chekcID)) {
      let role = Role.findById(req.params.role).catch((err) => {
        log(
          'Controller.employeeController.getEmployeeByRole - Failed to find Role ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })
      roleID = role._id
    } else {
      log(
        'Controller.employeeController.getEmployeeByRole - Failed to identify Role ',
        'error'
      )
      return apiResponse.errorResponse(res, 'ROLE_IDENTIFICATION_FAILED')
    }
    let employee = await Employee.find({ roleID: roleID }).catch((err) => {
      log(
        'Controller.employeeController.getEmployeeByRole - Failed while searching for employee with the role id: ' +
          roleID +
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

exports.getEmployeeBySchool = [
  async (req, res) => {
    log('Controller.employeeController.getEmployeeBySchool - Start', 'debug')
    let employee = await Employee.findById(req.headers['x-employeeid'])
    let schoolID = employee.schoolID
    let school = School.findById(employee.schoolID).catch((err) => {
      log(
        'Controller.employeeController.getEmployeeBySchool - Failed to find School ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    if (school === undefined) {
      log(
        'Controller.employeeController.getEmployeeByRole - School not Found ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, 'SCHOOL_NOT_FOUND')
    }

    let employees = await Employee.find({ schoolID: schoolID }).catch((err) => {
      log(
        'Controller.employeeController.getEmployeeBySchool - Failed while searching for employee with the school id: ' +
          schoolID +
          '. Error Message is' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })

    let returnEmployee = await mergeRoleIDWithNameAndClassIDWithName(
      employees
    ).catch((err) => {
      log(
        'Controller.employeeController.getEmployeeBySchool - Failed while merging Role and Class: ' +
          schoolID +
          '. Error Message is ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })

    if (!Array.isArray(returnEmployee)) {
      returnEmployee = [returnEmployee]
    }

    log('Controller.employeeController.getEmployeeBySchool - END ', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'EMPLOYEE_FOUND_SCHOOL',
      returnEmployee
    )
  },
]

//HELPER FUNCTIONS

async function mergeRoleIDWithNameAndClassIDWithName(employee) {
  let employees = []
  if (!employee) {
    return employee
  }
  for (let i = 0; i < employee.length; i++) {
    let classes = []
    if (employee[i].classID) {
      if (employee[i].classID.length === 0) {
        classes = ['']
      } else {
        for (let j = 0; j < employee[i].classID.length; j++) {
          if (employee[i].classID[j] !== '') {
            let classObject = await Class.findById(
              employee[i].classID[j]
            ).catch((err) => {
              log(
                'Controller.employeeController.mergeRoleIDWithNameAndClassIDWithName - Failed while Finding Class: ' +
                  employee[i].classID[j] +
                  '. Error Message is' +
                  err.message,
                'error'
              )
              return apiResponse.errorResponse(res, err.message)
            })
            classes.push(classObject.name)
          }
        }
      }
    }
    let role = await Role.findById(employee[i].roleID).catch((err) => {
      log(
        'Controller.employeeController.mergeRoleIDWithNameAndClassIDWithName - Failed while Finding Role: ' +
          employee[i].roleID +
          '. Error Message is' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    let school = await School.findById(employee[i].schoolID).catch((err) => {
      log(
        'Controller.employeeController.mergeRoleIDWithNameAndClassIDWithName - Failed while Finding School: ' +
          employee[i].roleID +
          '. Error Message is' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    employees.push({
      _id: employee[i]._id,
      name: employee[i].name,
      birthdate: employee[i].birthdate,
      classID: employee[i].classID,
      className: classes,
      roleID: employee[i].roleID,
      roleName: role.name,
      schoolID: employee[i].schoolID,
      schoolName: school.name,
    })
  }
  return employees
}
