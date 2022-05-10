const express = require('express')
const middleware = require('../middleware/index')
const bookController = require('../controller/bookController')

const bookRouter = express.Router({
  mergeParams: true,
})

bookRouter.post('/addBook', middleware.checkTeacher, bookController.addBook)

bookRouter.post('/editBook', middleware.checkTeacher, bookController.editBook)

bookRouter.post('/updateStudentID', middleware.checkLogged, bookController.updateStudentID)

bookRouter.delete(
  '/deleteBook',
  middleware.checkTeacher,
  bookController.deleteBook
)

bookRouter.get(
  '/getAllBooks',
  middleware.checkStudent,
  bookController.getAllBooks
)
bookRouter.get(
  '/getBookByID',
  middleware.checkStudent,
  bookController.getBookByID
)
bookRouter.get(
  '/getBookByName',
  middleware.checkStudent,
  bookController.getBookByName
)
bookRouter.get(
  '/getBoogetAllBooksOfOneGenreByID',
  middleware.checkStudent,
  bookController.getAllBooksOfOneGenre
)

module.exports.default = bookRouter
