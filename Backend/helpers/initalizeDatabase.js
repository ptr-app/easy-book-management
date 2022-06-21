require('dotenv/config')
const { log } = require('../helpers/logger')

const { ObjectId } = require('mongodb')
const Role = require('../models/roleModel')

module.exports = {
  createStandardRoles: async function () {
    log('Helpers.initalizeDatabase.createStandardRoles - Start ', 'debug')
    let allRoles = await Role.find()
    if (allRoles.length === 0) {
      let teacherRole = new Role({
        _id: ObjectId(process.env.TEACHER_ID),
        name: 'teacher',
      })
      await teacherRole.save().catch((err) => {
        console.error(
          'Helpers.initalizeDatabase.createStandardRoles - Failed to add Teacher Role: ' +
            err.message
        )
      })
      log(
        'Helpers.initalizeDatabase.createStandardRoles - Created Teacher Role',
        'info'
      )

      let deanRole = new Role({
        _id: ObjectId(process.env.DEAN_ID),
        name: 'dean',
      })
      await deanRole.save().catch((err) => {
        console.error(
          'Helpers.initalizeDatabase.createStandardRoles - Failed to add Dean Role: ' +
            err.message
        )
      })
      log(
        'Helpers.initalizeDatabase.createStandardRoles - Created Dean Role',
        'info'
      )
    } else {
      log(
        'Helpers.initalizeDatabase.createStandardRoles - Roles already exist',
        'info'
      )
    }
    log('Helpers.initalizeDatabase.createStandardRoles - End ', 'debug')
  },
}
