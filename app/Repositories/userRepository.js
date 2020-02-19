'use strict'

const userEntity = require('../Entities/UserEntity')
const bookingEntity = require('../Entities/BookingEntity')

/**
 * 
 * @param {string} username 
 * @description Retrieves a user found by username
 */
const getUserByUsername = async username => await userEntity.findOne({ username })

/**
 * 
 * @param {string} username 
 * @description Retrieves a user found by id
 */
const getUserById = async id => await userEntity.findById(id)

/**
 * 
 * @param {string} username 
 * @description Increases or decreases the balance for the user given
 */
const addBalance = async (user, amount) => await user.save({ balance: user.balance + amount})

/**
 * 
 * @param {object} user 
 * @param {object} request 
 * @param {object} response 
 * @description Saves the booking's details
 */
const addBooking = async (user, request, response) => {
  const booking = new bookingEntity({
    userId: user._id,
    request,
    response
  })

  return await booking.save()
}


module.exports = {
  getUserByUsername,
  getUserById,
  addBalance,
  addBooking
}