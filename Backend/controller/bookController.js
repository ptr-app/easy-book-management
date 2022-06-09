const { log } = require('../helpers/logger')
const apiResponse = require('../helpers/apiResponse')
const Book = require('../models/bookModel')
const Student = require('../models/studentModel')
const Genre = require('../models/genreModel')

exports.addBook = [
  async (req, res) => {
    log('Controller.bookController.addBook - Start', 'debug')
    const { name, author, releaseDate, comment, genreID, studentID } = req.body
    let book = new Book({
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
    return apiResponse.successResponseWithData(res, 'BOOK_CREATED', newBook)
  },
]

exports.editBook = [
  async (req, res) => {
    log('Controller.bookController.editBook - Start', 'debug')
    delete req.body.studentID
    let book = await Book.findByIdAndUpdate(req.body._id, req.body).catch(
      (err) => {
        log(
          'Controller.bookController.editBook - Failed to edit Book ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      }
    )

    log('Controller.bookController.editBook - End', 'debug')
    return apiResponse.successResponseWithData(res, 'BOOK_EDITED', book)
  },
]

exports.updateStudentID = [
  async (req, res) => {
    log('Controller.bookController.updateStudentID - Start', 'debug')
    let studentID
    if (req.body.studentID !== undefined) {
      Student.findById(req.body.studentID).catch((err) => {
        log(
          'Controller.employeeController.updateStudentID - Failed to find Student ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      })
      studentID = req.body.studentID
    } else {
      studentID = null
    }
    let book = await Book.findByIdAndUpdate(req.body._id, {
      studentID: studentID,
    }).catch((err) => {
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
      'BOOK_ASSIGNED_STUDENT',
      book
    )
  },
]

exports.deleteBook = [
  async (req, res) => {
    log('Controller.bookController.deleteBook - Start ', 'debug')
    let book = Book.findById(req.body._id).catch((err) => {
      log(
        'Controller.bookController.deleteBook - Failed to find book: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    if (book.studentID.length !== null) {
      log(
        'Controller.bookController.deleteBook - Failed to delete book with Student attached to it: ',
        'error'
      )
      return apiResponse.errorResponse(res, 'BOOK_HAS_STUDENT')
    }
    await Book.findByIdAndDelete(req.body._id).catch((err) => {
      log(
        'Controller.bookController.deleteBook - Failed to delete book: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })

    log('Controller.bookController.editBook - End', 'debug')
    return apiResponse.successResponse(res, 'BOOK_DELETED')
  },
]

exports.getAllBooks = [
  async (req, res) => {
    log('Controller.bookController.getAllBooks - Start', 'debug')
    let allBooks = await Book.find().catch((err) => {
      log(
        'Controller.bookController.getAllBooks - Failed while searching for books' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.bookController.getAllBooks - End', 'debug')
    return apiResponse.successResponseWithData(res, 'BOOKS_FOUND', allBooks)
  },
]

exports.getBookByID = [
  async (req, res) => {
    log('Controller.bookController.getBookByID - Start', 'debug')
    let book = await Book.findById(req.body._id).catch((err) => {
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
    return apiResponse.successResponseWithData(res, 'BOOK_FOUND', book)
  },
]

exports.getBookByName = [
  async (req, res) => {
    log('Controller.bookController.getBookByName - Start', 'debug')
    let book = await Book.find({ name: req.body.name }).catch((err) => {
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
    return apiResponse.successResponseWithData(res, 'BOOK_FOUND_NAME', book)
  },
]

exports.getAllBooksOfOneGenre = [
  async (req, res) => {
    log('Controller.bookController.getAllBooksOfOneGenre - Start', 'debug')
    let books = await Book.find({ genreID: req.body.genreID }).catch((err) => {
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
    return apiResponse.successResponseWithData(res, 'BOOKS_FOUND_GENRE', books)
  },
]

exports.getBooksByStudent = [
  async (req, res) => {
    log('Controller.bookController.getBooksByStudent - Start', 'debug')
    let book = await Book.find({ studentID: req.params.id }).catch((err) => {
      log(
        'Controller.bookController.getBooksByStudent - Failed while searching for the book with the name: ' +
          req.body.name +
          '. Error Message is' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    let returnBook = await mergeBooksWithGenre(book)
    log('Controller.bookController.getBooksByStudent - END ', 'debug')
    return apiResponse.successResponseWithData(
      res,
      'BOOK_FOUND_STUDENT',
      returnBook
    )
  },
]

exports.rentBook = [
  async (req, res) => {
    log('Controller.bookController.rentBook - Start', 'debug')
    const { bookID, studentID } = req.body
    let book = await Book.findById(bookID)
    if (book.studentID.length > 0) {
      log(
        'Controller.bookController.rentBook - Book is already rented by another person: ',
        'error'
      )
      return apiResponse.errorResponse(res, 'BOOK_IS_RENTED')
    }
    let newBook = await Book.findByIdAndUpdate(bookID, {
      studentID: studentID,
    }).catch((err) => {
      log(
        'Controller.bookController.rentBook - Failed to update book: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    let student = await Student.findById(studentID)
    student.bookID.push(bookID)
    let newStudent = await Student.findByIdAndUpdate(studentID, {
      bookID: student.bookID,
    }).catch((err) => {
      log(
        'Controller.bookController.rentBook - Failed to update Student: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.bookController.rentBook - End', 'debug')
    return apiResponse.successResponse(res, 'BOOK_RENTED')
  },
]

exports.returnBook = [
  async (req, res) => {
    log('Controller.bookController.returnBook - Start', 'debug')
    const { bookID, studentID } = req.body
    let book = await Book.findById(bookID)
    if (book.studentID.length === 0) {
      log(
        'Controller.bookController.returnBook - Book is not rented by another person: ',
        'error'
      )
      return apiResponse.errorResponse(res, 'BOOK_IS_NOT_RENTED')
    }
    let newBook = await Book.findByIdAndUpdate(bookID, {
      studentID: '',
    }).catch((err) => {
      log(
        'Controller.bookController.returnBook - Failed to update book: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    let student = await Student.findById(studentID)
    student.bookID.remove(bookID)
    let newStudent = await Student.findByIdAndUpdate(studentID, {
      bookID: student.bookID,
    }).catch((err) => {
      log(
        'Controller.bookController.returnBook - Failed to update Student: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.bookController.returnBook - End', 'debug')
    return apiResponse.successResponse(res, 'BOOK_RETURNED')
  },
]

//HELPER FUNCTIONS

async function mergeBooksWithGenre(book) {
  let books = []
  for (let i = 0; i < book.length; i++) {
    let genre = await Genre.findById(book[i].genreID)
    books.push({
      _id: book[i]._id,
      name: book[i].name,
      author: book[i].author,
      releaseDate: book[i].releaseDate,
      comment: book[i].comment,
      genreID: book[i].genreID,
      genreName: genre.name,
      studentID: book[i].studentID,
    })
  }
  return books
}
