const express = require('express')
const middleware = require('../middleware/index')
const genreController = require('../controller/genreController')

const genreRouter = express.Router({
  mergeParams: true,
})

classRouter.post('/addGenre', middleware.checkTeacher, genreController.addGenre)

classRouter.post(
  '/editGenre',
  middleware.checkTeacher,
  genreController.editGenre
)

classRouter.delete(
  '/deleteGenre',
  middleware.checkTeacher,
  genreController.deleteGenre
)

classRouter.get(
  '/getAllGenres',
  middleware.checkTeacher,
  genreController.getAllGenres
)

classRouter.get(
  '/getGenreByID',
  middleware.checkTeacher,
  genreController.getGenreByID
)

module.exports.default = genreRouter
