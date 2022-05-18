const log = require('../helpers/logger')
const apiResponse = require('../helpers/apiResponse')
const classModel = require('../models/classModel')
const Student = require('../models/studentModel')

exports.advanceAllStudentsFromClass = [
  async (req, res) => {
    log(
      'Controller.logikController.advanceAllStudentsFromClass - Start',
      'debug'
    )
  },
]
