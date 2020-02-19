'use strict'
const env = require('dotenv')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

console.log('seed running')

var seed = {
  user: {
    _id: new ObjectID('5a46cd13ec258196ede0d4d4'),
    name: 'Iram',
    lastname: 'Gutiérrez',
    username: 'iram.gutierrez',
    balance: 10000,
    password: 'sha1$a9af6a55$1$3742ebc0db7f104853d926492e35b5d07e9e1785', // bnext123
    updatedAt: new Date(),
    createdAt: new Date()
  }
}

env.config()

const url = process.env.DB_URI

MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  if (err) { throw err }
  const db = client.db(process.env.DB_NAME)

  const collectionUser = db.collection('users')

  collectionUser.insert(seed.user, (error, result) => {
    if (error) { console.error(error.message) }
    console.log('seed finish')
  })
})
