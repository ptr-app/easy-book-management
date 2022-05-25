const express = require('express')
const middleware = require('../middleware/index')
const studentController = require('../controller/studentController')

const studentRouter = express.Router({
  mergeParams: true,
})

studentRouter.post(
  '/addStudent',
  middleware.checkTeacher,
  studentController.addStudent
)

studentRouter.post(
  '/editStudent',
  middleware.checkTeacher,
  studentController.editStudent
)

studentRouter.post(
  '/editStudentClassID',
  middleware.checkTeacher,
  studentController.editStudentClassID
)

studentRouter.post(
  '/editStudentBookID',
  middleware.checkStudent,
  studentController.editStudentBookID
)

studentRouter.delete(
  '/deleteStudent',
  middleware.checkTeacher,
  studentController.deleteStudent
)

studentRouter.get(
  '/getAllStudents',
  middleware.checkAdmin,
  studentController.getAllStudents
)

studentRouter.get(
  '/getStudentByID',
  middleware.checkTeacher,
  studentController.getStudentByID
)

studentRouter.get(
  '/getStudentsByClass/:id',
  middleware.checkTeacher,
  studentController.getStudentsByClass
)

studentRouter.get(
  '/getStudentsBySchool',
  middleware.checkDean,
  studentController.getStudentsBySchool
)

module.exports.default = studentRouter
