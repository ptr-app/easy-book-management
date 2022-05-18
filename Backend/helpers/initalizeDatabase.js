require('dotenv/config')

const { ObjectId } = require('mongodb')
const Role = require('../models/roleModel')

module.exports = {
  createStandardRoles: async function () {
    console.log('Helpers.initalizeDatabase.createStandardRoles - Start ')
    let allRoles = await Role.find()
    if (allRoles.length === 0) {
      let teacherRole = new Role({
        _id: ObjectId(process.env.TEACHER_ID),
        name: 'Teacher',
      })
      await teacherRole.save().catch((err) => {
        console.error(
          'Helpers.initalizeDatabase.createStandardRoles - Failed to add Teacher Role: ' +
            err.message
        )
      })
      console.log(
        'Helpers.initalizeDatabase.createStandardRoles - Created Teacher Role'
      )

      let deanRole = new Role({
        _id: ObjectId(process.env.DEAN_ID),
        name: 'Dean',
      })
      await deanRole.save().catch((err) => {
        console.error(
          'Helpers.initalizeDatabase.createStandardRoles - Failed to add Dean Role: ' +
            err.message
        )
      })
      console.log(
        'Helpers.initalizeDatabase.createStandardRoles - Created Dean Role'
      )
    } else {
      console.log(
        'Helpers.initalizeDatabase.createStandardRoles - Roles already exist'
      )
    }
    console.log('Helpers.initalizeDatabase.createStandardRoles - End ')
  },
}
