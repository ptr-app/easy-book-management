const jwt = require('jsonwebtoken')

exports.jwtForUser = function (user) {
  const jwtPayload = user
  const jwtData = {
    expiresIn: '1d',
  }
  const secret = process.env.JWT_SECRET
  return jwt.sign(jwtPayload, secret, jwtData)
}
