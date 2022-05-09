const jwt = require('jsonwebtoken')

exports.checkStudent= [
    (req,res,next) => {
        //TODO implement Check if the User is a Student
        next()
    }
]

exports.checkTeacher= [
    (req,res,next) => {
        //TODO implement Check if the User is a Teacher
        next()
    }
]
