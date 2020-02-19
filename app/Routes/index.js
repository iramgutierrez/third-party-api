'use strict'

const { verifyToken } = require('../Middleware/authMiddleware')
const loginRoute = require('./loginRoute')
const { availabilityRoute, flightInsuranceRoute } = require('./flightInsuranceRoute')

/**
 * 
 * @param {object} app
 * @description Inject routes into express app
 */
module.exports = async app => {
  // Login user
  app.post('/login', ...loginRoute)

  // Middleware to verify JWT
  app.use(verifyToken)

  // Check availability
  app.post('/flight-insurance/availability', ...availabilityRoute)

  // Make a booking
  app.post('/flight-insurance', ...flightInsuranceRoute)
}