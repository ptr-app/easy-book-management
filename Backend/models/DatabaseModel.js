const mongoose = require('mongoose')
const {Schema} = mongoose

const studentModel = new Schema({
    name: {type: String, trim: true},
    passwordHash: {type: String, trim: true},
    birthdate: {type: Date},
    classID: {type: String},
    bookID: {type: [String]},
})

const employeeModel = new Schema({
    name: {type: String, trim: true},
    passwordHash: {type: String, trim: true},
    birthdate: {type: Date},
    classID: {type: String},
    roleID: {type: String},
})

const classModel = new Schema({
    name: {type: String, trim: true},
    studentsID: {type: [String]},
    employeeID: {type: String},
    schoolID: {type: String},
})

const bookModel = new Schema({
    name: {type: String, trim: true},
    author: {type: String, trim: true},
    releaseDate: {type: Date},
    genre: {type: String},
    comment: {type: String},
    studentID: {type: [String]},
})

const schoolModel = new Schema({
    name: {type: String, trim: true},
    classID: {type: [String]},
})

const genreModel = new Schema({
    name: {type: String, trim: true},
})

const roleModel = new Schema({
    name: {type: String, trim: true},
})

const Student = mongoose.model('Student', studentModel)
const Employee = mongoose.model('Employee', employeeModel)
const Class = mongoose.model('Class', classModel)
const Book = mongoose.model('Book', bookModel)
const School = mongoose.model('School', schoolModel)
const Genre = mongoose.model('Genre', genreModel)
const Role = mongoose.model('Role', roleModel)

module.exports = Student, Employee, Class, Book, School, Genre, Role