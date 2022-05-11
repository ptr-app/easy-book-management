const express = require('express')
const middleware = require('../middleware/index')
const genreController = require('../controller/genreController')

const genreRouter = express.Router({
  mergeParams: true,
})

genreRouter.post('/addGenre', middleware.checkTeacher, genreController.addGenre)

genreRouter.post(
  '/editGenre',
  middleware.checkTeacher,
  genreController.editGenre
)

genreRouter.delete(
  '/deleteGenre',
  middleware.checkTeacher,
  genreController.deleteGenre
)

genreRouter.get(
  '/getAllGenres',
  middleware.checkTeacher,
  genreController.getAllGenres
)

genreRouter.get(
  '/getGenreByID',
  middleware.checkTeacher,
  genreController.getGenreByID
)

module.exports.default = genreRouter
