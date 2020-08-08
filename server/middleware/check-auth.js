const jwt = require('jsonwebtoken')
const HttpError = require('../models/http-error')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1] // Authorisation 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication falied!')
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    req.userData = { userId: decodedToken.userId }
    next()
  } catch (error) {
    return next(new HttpError('Authentication falied!', 403))
  }
}
