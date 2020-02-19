'use strict'

const mongoose = require('mongoose')
mongoose.set('debug', true)

/**
 * Schema for User entity
 */
const schema = new mongoose.Schema({
  name: 'string',
  surname: 'string',
  lastname: 'string', 
  email: 'string',
  password: 'string',
  balance: 'number',
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

const User = mongoose.model('User', schema)

module.exports = User