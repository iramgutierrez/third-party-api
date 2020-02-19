'use strict'

const { verifyUser } = require('../Middleware/authMiddleware')
const loginController = require('../Controllers/loginController')

const loginRoute = [
  verifyUser,
  loginController
]

module.exports = loginRoute