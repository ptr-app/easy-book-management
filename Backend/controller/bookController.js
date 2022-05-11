const log = require('../helpers/logger')
const apiResponse = require('../helpers/apiResponse')
const bookModel = require('../models/DatabaseModel')

exports.addBook = [
  async (req, res) => {
    log('Controller.bookController.addBook - Start', 'debug')
    const { name, author, releaseDate, comment, genreID, studentID } = req.body
    let book = new bookModel({
      name,
      author,
      releaseDate,
      comment,
      genreID,
      studentID,
    })
    let newBook = await book.save().catch((err) => {
      log(
        'Controller.bookController.addBook - Failed to add book: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.bookController.addBook - End', 'debug')
    return apiResponse.successResponseWithData(res, 'Book created', newBook)
  },
]

exports.editBook = [
  async (req, res) => {
    log('Controller.bookController.editBook - Start', 'debug')
    let book = await bookModel
      .findByIdAndUpdate(req.body._id, req.body)
      .catch((err) => {
        log(
          'Controller.bookController.editBook - Failed to edit Book ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })

    log('Controller.bookController.editBook - End', 'debug')
    return apiResponse.successResponseWithData(res, 'Book edited', book)
  },
]

exports.updateStudentID = [
  async (req, res) => {
    log('Controller.bookController.updateStudentID - Start', 'debug')
    let studentID
    if (req.body.studentID !== undefined) {
      studentID = req.body.studentID
    } else {
      studentID = null
    }
    let book = await bookModel
      .findByIdAndUpdate(req.body._id, { studentID: studentID })
      .catch((err) => {
        log(
          'Controller.bookController.updateStudentID - Failed to update Student ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })

    log('Controller.bookController.updateStudentID - End', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'Book assigned to a new Student',
      book
    )
  },
]

exports.deleteBook = [
  async (req, res) => {
    log('Controller.bookController.deleteBook - Start ', 'debug')
    await bookModel.findByIdAndDelete(req.body.id).catch((err) => {
      log(
        'Controller.bookController.deleteBook - Failed to delete book: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })

    log('Controller.bookController.editBook - End', 'debug')
    return apiResponse.successResponse(res, 'Book edited')
  },
]

exports.getAllBooks = [
  async (req, res) => {
    log('Controller.bookController.getAllBooks - Start', 'debug')
    let allBooks = await bookModel.find().catch((err) => {
      log(
        'Controller.bookController.getAllBooks - Failed while searching for books' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.bookController.getAllBooks - End', 'debug')
    return apiResponse.successResponseWithData(res, 'Books found', allBooks)
  },
]

exports.getBookByID = [
  async (req, res) => {
    log('Controller.bookController.getBookByID - Start', 'debug')
    let book = await bookModel.findById(req.body._id).catch((err) => {
      log(
        'Controller.bookController.getBookByID - Failed while searching for the book with the id: ' +
          req.body._id +
          '. Error Message is' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.bookController.getBookByID - END ', 'debug')
    return apiResponse.successResponseWithData(res, 'Book found', book)
  },
]

exports.getBookByName = [
  async (req, res) => {
    log('Controller.bookController.getBookByName - Start', 'debug')
    let book = await bookModel.find({ name: req.body.name }).catch((err) => {
      log(
        'Controller.bookController.getBookByName - Failed while searching for the book with the name: ' +
          req.body.name +
          '. Error Message is' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.bookController.getBookByName - END ', 'debug')
    return apiResponse.successResponseWithData(res, 'Book found', book)
  },
]

exports.getAllBooksOfOneGenre = [
  async (req, res) => {
    log('Controller.bookController.getAllBooksOfOneGenre - Start', 'debug')
    let books = await bookModel
      .find({ genreID: req.body.genreID })
      .catch((err) => {
        log(
          'Controller.bookController.getAllBooksOfOneGenre - Failed while searching for books with the Genre id: ' +
            req.body.genreID +
            '. Error Message is' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })
    log('Controller.bookController.getAllBooksOfOneGenre - END ', 'debug')
    return apiResponse.successResponseWithData(res, 'Books found', books)
  },
]
