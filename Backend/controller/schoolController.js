const {log} = require('../helpers/logger')
const apiResponse = require('../helpers/apiResponse')
const School = require('../models/schoolModel')
const Class = require('../models/classModel')

exports.addSchool = [
  async (req, res) => {
    log('Controller.schoolController.addSchool - Start', 'debug')
    const { name, classID } = req.body
    let school = new School({
      name,
      classID,
    })
    let newSchool = await school.save().catch((err) => {
      log(
        'Controller.schoolController.addSchool - Failed to add school: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.schoolController.addSchool - End', 'debug')
    return apiResponse.successResponseWithData(res, 'SCHOOL_CREATED', newSchool)
  },
]

exports.editSchool = [
  async (req, res) => {
    log('Controller.schoolController.editSchool - Start', 'debug')
    let school = await School.findByIdAndUpdate(req.body._id, req.body).catch(
      (err) => {
        log(
          'Controller.schoolController.editSchool - Failed to edit School ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      }
    )

    log('Controller.schoolController.editSchool - End', 'debug')
    return apiResponse.successResponseWithData(res, 'SCHOOL_EDITED', school)
  },
]

exports.deleteSchool = [
  async (req, res) => {
    log('Controller.schoolController.deleteSchool - Start ', 'debug')
    let ClassObject = Class.find({ schoolID: req.body._id }).catch((err) => {
      log(
        'Controller.schoolController.deleteSchool - Failed to find class: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    if (ClassObject.length > 0) {
      log(
        'Controller.schoolController.deleteSchool - Failed to delete school with ClassObject attached to it: ',
        'error'
      )
      return apiResponse.errorResponse(res, 'SCHOOL_HAS_CLASS')
    }
    await School.findByIdAndDelete(req.body._id).catch((err) => {
      log(
        'Controller.schoolController.deleteSchool - Failed to delete school: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })

    log('Controller.schoolController.deleteSchool - End', 'debug')
    return apiResponse.successResponse(res, 'SCHOOL_DELETED')
  },
]

exports.getAllSchools = [
  async (req, res) => {
    log('Controller.schoolController.getAllSchools - Start', 'debug')
    let allSchools = await School.find().catch((err) => {
      log(
        'Controller.schoolController.getAllSchools - Failed while searching for Schools' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.schoolController.getAllSchools - End', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'SCHOOLES_FOUND',
      allSchools
    )
  },
]

exports.getSchoolByID = [
  async (req, res) => {
    log('Controller.schoolController.getSchoolByID - Start', 'debug')
    let school = await School.findById(req.body._id).catch((err) => {
      log(
        'Controller.schoolController.getSchoolByID - Failed while searching for the school with the id: ' +
          req.body._id +
          '. Error Message is' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.schoolController.getSchoolByID - END ', 'debug')
    return apiResponse.successResponseWithData(res, 'SCHOOL_FOUND', school)
  },
]
