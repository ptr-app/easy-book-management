const { log } = require('../helpers/logger')
const apiResponse = require('../helpers/apiResponse')
const Student = require('../models/studentModel')
const Book = require('../models/bookModel')
const Class = require('../models/classModel')
const School = require('../models/schoolModel')
const User = require('../models/userModel')

exports.addStudent = [
  async (req, res) => {
    log('Controller.studentController.addStudent - Start', 'debug')
    const { name, birthdate, classID, bookID } = req.body
    let student = new Student({
      name,
      birthdate,
      classID,
      bookID,
    })
    let newStudent = await student.save().catch((err) => {
      log(
        'Controller.studentController.addStudent - Failed to add student: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.studentController.addStudent - End', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'STUDENT_CREATED',
      newStudent
    )
  },
]

exports.editStudent = [
  async (req, res) => {
    log('Controller.studentController.editStudent - Start', 'debug')
    delete req.body.classID
    delete req.body.bookID
    let student = await Student.findByIdAndUpdate(req.body._id, req.body).catch(
      (err) => {
        log(
          'Controller.studentController.editStudent - Failed to edit Student ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      }
    )

    log('Controller.studentController.editStudent - End', 'debug')
    return apiResponse.successResponseWithData(res, 'STUDENT_EDITED', student)
  },
]

exports.editStudentClassID = [
  async (req, res) => {
    log('Controller.studentController.editStudentClassID - Start', 'debug')
    let classID
    if (req.body.classID !== undefined) {
      Class.findById(req.body.classID).catch((err) => {
        log(
          'Controller.studentController.editStudentClassID - Failed to find ClassObject ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })

      classID = req.body.classID
    } else {
      log(
        'Controller.studentController.editStudentClassID - A Student needs an attached ClassObject ',
        'error'
      )
      return apiResponse.errorResponse(res, 'STUDENT_NEED_CLASS')
    }

    let student = await Student.findByIdAndUpdate(req.body._id, {
      classID: req.body.classID,
    }).catch((err) => {
      log(
        'Controller.studentController.editStudentClassID - Failed to edit Student ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })

    log('Controller.studentController.editStudentClassID - End', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'STUDENT_ASSIGNED_CLASS',
      student
    )
  },
]

exports.editStudentBookID = [
  async (req, res) => {
    log('Controller.studentController.editStudentBookID - Start', 'debug')
    let bookID
    if (req.body.bookID !== undefined) {
      Class.findById(req.body.bookID).catch((err) => {
        log(
          'Controller.studentController.editStudentBookID - Failed to find Book ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })
      bookID = req.body.bookID
    } else {
      bookID = null
    }

    let student = await Student.findByIdAndUpdate(req.body._id, {
      bookID: req.body.bookID,
    }).catch((err) => {
      log(
        'Controller.studentController.editStudentBookID - Failed to edit Student ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })

    log('Controller.studentController.editStudentBookID - End', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'STUDENT_ASSIGNED_BOOK',
      student
    )
  },
]

exports.deleteStudent = [
  async (req, res) => {
    log('Controller.studentController.deleteStudent - Start ', 'debug')
    let book = Book.find({ studentID: req.body.studentID }).catch((err) => {
      log(
        'Controller.studentController.deleteStudent - Failed to find book: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    if (book.length > 0) {
      log(
        'Controller.studentController.deleteStudent - Failed to delete student with Book attached to it: ',
        'error'
      )
      return apiResponse.errorResponse(res, 'STUDENT_HAS_BOOK')
    }
    let studentClass = await Class.findOne({
      studentsID: req.body.studentID,
    }).catch((err) => {
      log(
        'Controller.studentController.deleteStudent - Failed to find class: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    let newStudents = []
    studentClass.studentsID.forEach((student) => {
      if (student !== req.body.studentID) {
        newStudents.push(student)
      }
    })
    await studentClass.update({ studentsID: newStudents }).catch((err) => {
      log(
        'Controller.studentController.deleteStudent - Failed to find class: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    await Student.findByIdAndDelete(req.body.studentID).catch((err) => {
      log(
        'Controller.studentController.deleteStudent - Failed to delete student: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    await User.findOneAndDelete({ userID: req.body.studentID }).catch((err) => {
      log(
        'Controller.studentController.deleteStudent - Failed to delete user: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })

    log('Controller.studentController.deleteStudent - End', 'debug')
    return apiResponse.successResponse(res, 'STUDENT_DELETED')
  },
]

exports.getAllStudents = [
  async (req, res) => {
    log('Controller.studentController.getAllStudents - Start', 'debug')
    let allStudents = await Student.find().catch((err) => {
      log(
        'Controller.studentController.getAllStudents - Failed while searching for Students' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.studentController.getAllStudents - End', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'STUDENTS_FOUND',
      allStudents
    )
  },
]

exports.getStudentByID = [
  async (req, res) => {
    log('Controller.studentController.getStudentByID - Start', 'debug')
    let student = await Student.findById(req.body._id).catch((err) => {
      log(
        'Controller.studentController.getStudentByID - Failed while searching for the student with the id: ' +
          req.body._id +
          '. Error Message is' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.studentController.getStudentByID - END ', 'debug')
    return apiResponse.successResponseWithData(res, 'STUDENT_FOUND', student)
  },
]

exports.getStudentsByClass = [
  async (req, res) => {
    log('Controller.studentController.getStudentsByClass - Start', 'debug')
    let students = await Student.find({ classID: req.params.id }).catch(
      (err) => {
        log(
          'Controller.studentController.getStudentsByClass - Failed while searching for the students with the classID: ' +
            req.body._id +
            '. Error Message is' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      }
    )
    log('Controller.studentController.getStudentsByClass - END ', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'STUDENT_FOUND_CLASS',
      students
    )
  },
]

exports.getStudentsBySchool = [
  async (req, res) => {
    log('Controller.studentController.getStudentsByEmployee - Start', 'debug')
    let school = await School.find({ employeeID: req.headers['x-employeeid'] })
    let students = await getStudents(school)
    log('Controller.studentController.getStudentsByEmployee - END ', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'STUDENT_FOUND_EMPLOYEE',
      students
    )
  },
]

//HELPER FUNCTIONS

async function getStudents(school) {
  let students = []
  for (let i = 0; i < school.length; i = i + 1) {
    let classes = await Class.find({ schoolID: school[i]._id })
    for (let j = 0; j < classes.length; j = j + 1) {
      let classStudent = await Student.find({ classID: classes[j]._id })
      for (let k = 0; k < classStudent.length; k = k + 1) {
        students.push({
          _id: classStudent[k]._id,
          name: classStudent[k].name,
          bookID: classStudent[k].bookID,
          birthdate: classStudent[k].birthdate,
          classID: classes[j]._id,
          className: classes[j].name,
          schoolID: school[i]._id,
          schoolName: school[i].name,
        })
      }
    }
  }
  return students
}
