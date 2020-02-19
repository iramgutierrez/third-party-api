'use strict'

const request = require('request-promise-native')
const parser = require('xml2json')
const { getavailabilityTemplate, getBookingTemplate } = require('../Templates/flightInsuranceTemplate')

/**
 * 
 * @param {object} data 
 * @description Makes a getavailability third party request and returns the result formatted
 */
const getavailability = async data => {
  const body = getavailabilityTemplate(data)

  const availabilityXML = await request({
    method: 'POST',
    uri: 'https://ws.intermundial.es/travelio-soaTIO/CommonsWSSessionBean',
    body,
    headers: {
      'content-type': 'application/xml'
    }
  })
  const availabilityObject = JSON.parse(parser.toJson(availabilityXML))
    ['soap:Envelope']
    ['soap:Body']
    ['ns2:getAvailabilityV2Response']
    .availableProducts
    .varietyCombinations

  const availability = availabilityObject
    .varietyDistributions
    .priceInfo
    .reduce((modalities, priceModality) => {
      const modalityCode = priceModality.modality.code
      const modalityIndex = modalities.findIndex(modality => modality.modality.code === modalityCode)

      if (!modalityCode || modalityIndex === -1) { return modalities }

      modalities[modalityIndex] = Object.assign(modalities[modalityIndex], priceModality)

      return modalities
    }, availabilityObject.modalitiesInfo)

  return availability
}

/**
 * 
 * @param {object} data 
 * @description Makes a bookV2 third party request and returns the result formatted
 */
const booking = async (data, user) => {
  const body = getBookingTemplate(data, user, (new Date()).getTime())
  let error
  const bookingXML = await request({
    method: 'POST',
    uri: 'https://ws.intermundial.es/travelio-soaTIO/CommonsWSSessionBean',
    body,
    headers: {
      'content-type': 'application/xml'
    }
  }).catch(err => error = _getError(err.message))

  if (error) { throw new Error(error) }

  const bookingObject = JSON.parse(parser.toJson(bookingXML))
    ['soap:Envelope']
    ['soap:Body']
    ['ns2:bookV2Response']
    .booking
  
  delete bookingObject.tags

  return bookingObject
}

/**
 * 
 * @param {string} response
 * @description Tries to get a formatted error from third party error
 */
const _getError = response => {
  const init = response.indexOf('<faultstring>')
  const end = response.indexOf('</faultstring>')
  if (init === -1 || end === -1) { return 'Generic server error' }

  return response.substring(init + '<faultstring>'.length, end)
}

module.exports = {
  getavailability,
  booking
}