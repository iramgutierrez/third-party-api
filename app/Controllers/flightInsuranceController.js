'use strict'

const { addBalance, addBooking } = require('../Repositories/userRepository')
const { getavailability, booking } = require('../Services/intermundialService')

/**
 * 
 * @param {object} req 
 * @param {object} res
 * @description Orchests the flow to invoke the getavailability third party request and returns the result
 */
const availabilityController = async (req, res) => {
  let error
  const availability = await getavailability(req.body).catch(err => error = err.message)

  if (error) { return res.status(500).json({ error }) }

  return res.json({ availability })
}

/**
 * 
 * @param {req} req 
 * @param {res} res
 * @description Orchests the flow to invoke the book third party request,
 * verifies and decrements the user balance, and saves the booking details
 * 
 */
const flightInsuranceController = async (req, res) => {
  let error
  const availability = await getavailability(req.body).catch(err => error = err.message)

  const modality = availability.find(a => a.modality && a.modality.code === req.body.modality)

  if (modality && modality.sellPrice > req.user.balance) {
    error = 'You do not have enough balance.'
  }

  if (error) { return res.status(500).json({ error }) }

  const book = await booking(req.body, req.user).catch(err => error = err.message)

  if (error) { return res.status(500).json({ error }) }

  await addBalance(req.user, modality.sellPrice * -1)

  await addBooking(req.user, req.body, book)

  return res.json({ code: book.code })
}

module.exports = {
  availabilityController,
  flightInsuranceController
}