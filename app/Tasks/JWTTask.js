'use strict'

const jwt = require('jsonwebtoken')

/**
 * 
 * @param {object} payload
 * @description Generates a JWT with the payload given and using the secret given
 */
const createToken = async payload => await jwt.sign(payload, process.env.JWT_SECRET)

/**
 * 
 * @param {string} token
 * @description Tries to get a payload from the token given
 */
const getPayload = async token => await jwt.verify(token, process.env.JWT_SECRET)

module.exports = {
  createToken,
  getPayload
}