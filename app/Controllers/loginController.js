'use strict'

const { createToken } = require('../Tasks/JWTTask')

const loginController = async (req, res) => {
  const token = await createToken({ userId: req.user._id })
  let user = req.user.toObject()
  delete user.password
  return res.json(Object.assign(user, { token }))
}

module.exports = loginController