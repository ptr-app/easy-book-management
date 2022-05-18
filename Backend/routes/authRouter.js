const express = require('express')
const middleware = require('../middleware/index')
const authController = require('../controller/authController')

const authRouter = express.Router({
  mergeParams: true,
})

authRouter.post('/login', middleware.checkNotLogged, authController.login)

authRouter.post('/registerStudent', middleware.checkNotLogged, authController.registerStudent)

authRouter.post('/registerEmployee', middleware.checkNotLogged, authController.registerEmployee)

authRouter.post('/registerSchool', middleware.checkNotLogged, authController.registerSchool)

authRouter.post(
  '/forgotPassword',
  middleware.checkNotLogged,
  authController.forgotPassword
)

authRouter.post('/logout', middleware.checkLogged, authController.logout)

module.exports.default = authRouter
