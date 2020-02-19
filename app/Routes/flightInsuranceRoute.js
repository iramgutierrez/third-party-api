'use strict'

const {
  availabilityValidator, 
  flightInsuranceValidator
} = require('../Validators/flightInsuranceValidator')
const { 
  availabilityController, 
  flightInsuranceController
} = require('../Controllers/flightInsuranceController')


const availabilityRoute = [
  availabilityValidator,
  availabilityController
]

const flightInsuranceRoute = [
  flightInsuranceValidator,
  flightInsuranceController
]

module.exports = {
  availabilityRoute,
  flightInsuranceRoute
}