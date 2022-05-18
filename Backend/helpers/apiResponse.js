exports.unathorizedResponse = function (res, message) {
  return res.status(401).json({ code: message })
}

exports.successResponse = function (res, message) {
  return res.status(200).json({ cose: message })
}

exports.successResponseWithData = function (res, message, data) {
  let resData = {
    code: message,
    data: data,
  }
  return res.status(200).json(resData)
}

exports.errorResponse = function (res, message) {
  return res.status(500).json({ cose: message })
}

exports.errorResponseWithData = function (res, message, data) {
  let resData = {
    code: message,
    data: data,
  }
  return res.status(500).json(resData)
}
