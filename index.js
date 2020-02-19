'use strict'

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const env = require('dotenv')

const routes = require('./app/Routes')


const app = express()
app.use(cors())
app.use(bodyParser.json())

/**
 * 
 * @param {Express App} app
 * @description Start the web server 
 */
const init = async (app) => {
  // load env variables
  env.config()

  // Run seed. Minimal required data.
  require('./seed.js')
  
  // Connect to database
  mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`, {useNewUrlParser: true})

  // Healthcheck
  app.get('/', (_, res) => res.json({date: new Date() }))

  // Load routes
  routes(app)

  // Start the server
  app.listen(process.env.PORT || 3000, () => console.log('Running'))
}

init(app)
  .catch(error => {
    console.error(error)
    process.exit(1)
  })