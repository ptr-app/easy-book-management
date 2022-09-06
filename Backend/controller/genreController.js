const { log } = require('../helpers/logger')
const apiResponse = require('../helpers/apiResponse')
const Genre = require('../models/genreModel')
const Book = require('../models/bookModel')

exports.addGenre = [
  async (req, res) => {
    log('Controller.genreController.addGenre - Start', 'debug')
    const { name } = req.body
    let genre = new Genre({
      name,
    })
    let newGenre = await genre.save().catch((err) => {
      log(
        'Controller.genreController.addGenre - Failed to add genre: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.genreController.addGenre - End', 'debug')
    return apiResponse.successResponseWithData(res, 'GENRE_CREATED', newGenre)
  },
]

exports.editGenre = [
  async (req, res) => {
    log('Controller.genreController.editGenre - Start', 'debug')
    let genre = await Genre.findByIdAndUpdate(req.body._id, req.body).catch(
      (err) => {
        log(
          'Controller.genreController.editGenre - Failed to edit Genre ' +
            err.message,
          'error'
        )
        return apiResponse.errorResponse(res, err.message)
      }
    )

    log('Controller.genreController.editGenre - End', 'debug')
    return apiResponse.successResponseWithData(res, 'GENRE_EDITED', genre)
  },
]

exports.deleteGenre = [
  async (req, res) => {
    log('Controller.genreController.deleteGenre - Start ', 'debug')
    let book = await Book.find({ genreID: req.body.genreID }).catch((err) => {
      log(
        'Controller.genreController.deleteGenre - Failed to find book: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    if (book.length > 0) {
      log(
        'Controller.genreController.deleteGenre - Failed to delete genre with Books attached to it: ',
        'error'
      )
      return apiResponse.errorResponse(res, 'GENRE_HAS_BOOKS')
    }
    await Genre.findByIdAndDelete(req.body.genreID).catch((err) => {
      log(
        'Controller.genreController.deleteGenre - Failed to delete genre: ' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })

    log('Controller.genreController.deleteGenre - End', 'debug')
    return apiResponse.successResponse(res, 'GENRE_DELETED')
  },
]

exports.getAllGenres = [
  async (req, res) => {
    log('Controller.genreController.getAllGenres - Start', 'debug')
    let allGenres = await Genre.find().catch((err) => {
      log(
        'Controller.genreController.getAllGenres - Failed while searching for Genres' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.genreController.getAllGenres - End', 'debug')
    return apiResponse.successResponseWithData(res, 'GENRES_FOUND', allGenres)
  },
]

exports.getGenreByID = [
  async (req, res) => {
    log('Controller.genreController.getGenreByID - Start', 'debug')
    let genre = await Genre.findById(req.body._id).catch((err) => {
      log(
        'Controller.genreController.getGenreByID - Failed while searching for the genre with the id: ' +
          req.body._id +
          '. Error Message is' +
          err.message,
        'error'
      )
      return apiResponse.errorResponse(res, err.message)
    })
    log('Controller.genreController.getGenreByID - END ', 'debug')
    return apiResponse.successResponseWithData(res, 'GENRE_FOUND', genre)
  },
]
