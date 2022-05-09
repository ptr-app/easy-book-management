const express = require('express')
const bookRouter = require('./bookRouter')
const classRouter = require('./classRouter')
const studentRouter = require('./studentRouter')
const employeeRouter = require('./employeeRouter')
const schoolRouter = require('./schoolRouter')
const genreRouter = require('./genreRouter')
const roleRouter = require('./roleRouter')
const { model } = require('mongoose')

const router = express.Router({
    mergeParams: true
})

router.use('/book', bookRouter.default)
router.use('/class', classRouter.default)
router.use('/student', studentRouter.default)
router.use('/employee', employeeRouter.default)
router.use('/school', schoolRouter.default)
router.use('/genre', genreRouter.default)
router.use('/role', roleRouter.default)

module.exports = router