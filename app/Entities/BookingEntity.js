'use strict'

const mongoose = require('mongoose')
mongoose.set('debug', true)

/**
 * @description Schema for Booking entity
 */
const schema = new mongoose.Schema({
  userId: mongoose.ObjectId, 
  request: mongoose.Mixed, 
  response: mongoose.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', schema)

module.exports = Booking