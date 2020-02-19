'use strict'

const Validator = require('validatorjs')

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @description Validates the received availability data and passes to the next handle or return an error
 */
const availabilityValidator = async (req, res, next) => {
  const rules = {
    productId: 'required',
    adultNumber: 'required|integer',
    arrivalDate: 'required|date',
    departureDate: 'required|date|after_or_equal:arrivalDate',
  }
   
  const validation = new Validator(req.body, rules)

  if (!validation.passes()) {
    return res.status(400).json({ errors: validation.errors.all() })
  }
  return next()
}

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @description Validates the received booking data and passes to the next handle or return an error
 */
const flightInsuranceValidator = async (req, res, next) => {
  const rules = {
    adultNumber: 'required|integer',
    arrivalDate: 'required|date',
    departureDate: 'required|date|after_or_equal:arrivalDate',
    futureBookingState: 'required',
    productId: 'required',
    sellContract: 'required',
    sellTariff: 'required',
    sellPriceSheet: 'required',
    sellCurrency: 'required',
    modality: 'required',
    passengers: 'required',
  }
   
  const validation = new Validator(req.body, rules)

  if (!validation.passes()) {
    return res.status(400).json({ errors: validation.errors.all() })
  }
  return next()
}

module.exports = {
  availabilityValidator,
  flightInsuranceValidator
}