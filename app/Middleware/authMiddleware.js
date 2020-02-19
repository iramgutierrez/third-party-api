'use strict'

const passwordHash = require('password-hash')

const { getUserByUsername, getUserById } = require('../Repositories/userRepository')
const { getPayload } = require('../Tasks/JWTTask')

/**
 * 
 * @param {req} req 
 * @param {res} res 
 * @param {next} next 
 * @description Verifies that the username given exists and the password given makes match with the user's password hashed
 */
const verifyUser = async (req, res, next) => {
  const user = await getUserByUsername(req.body.username)

  if (!user) { return res.status(404).json({ error: 'User not found' }) }

  if (!passwordHash.verify(req.body.password, user.password)) {
    return res.status(401).json({ error: 'Password incorrect' })
  }

  req.user = user

  return next()
}

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @description Verifies that the JWT has been sended and belongs a valid user
 */
const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization

  if (!token) { return res.status(401).json({ error: 'Access token is required' }) }

  token = token.replace('Bearer ', '')

  const payload = await getPayload(token).catch(_ => null)

  if (!payload) { return res.status(401).json({ error: 'Invalid access token' }) }
  
  const user = await getUserById(payload.userId)

  if (!user) { return res.status(404).json({ error: 'User not found' }) }

  req.user = user

  return next()
}

module.exports = {
  verifyUser,
  verifyToken
}