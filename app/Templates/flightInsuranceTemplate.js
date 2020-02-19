'use strict'

const getavailabilityTemplate = data => `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://commonsws.soa.travelio.xpt.es/">
  <soapenv:Header/>
  <soapenv:Body>
    <com:getAvailabilityV2>
        <authenticationData>
          <password>pruebas_mex</password>
          <user>pruebas_mex</user>
          <locale>es_ES</locale>
          <domain>intermundial-soaMexico</domain>
        </authenticationData>
        <availabilitySearchParams>
          <adultNumber>${data.adultNumber}</adultNumber>
          <arrivalDate>${data.arrivalDate}</arrivalDate>
          <childNumber>0</childNumber>
          <confirmedAvailability>true</confirmedAvailability>
          <departureDate>${data.departureDate}</departureDate>
          <productId>${data.productId}</productId>
          <type>SERVICE</type>
          <varietyNumber>1</varietyNumber>
        </availabilitySearchParams>
        <excludedInfo>PRODUCT_DESCRIPTION</excludedInfo>
    </com:getAvailabilityV2>
  </soapenv:Body>
</soapenv:Envelope>
`

const getBookingTemplate = (data, user, reference) => {
  let template =
    `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://commonsws.soa.travelio.xpt.es/">
      <soapenv:Header/>
      <soapenv:Body>
        <com:bookV2>
          <authenticationData>
              <password>pruebas_mex</password>
              <user>pruebas_mex</user>
              <locale>es_ES</locale>
              <domain>intermundial-soaMexico</domain>
          </authenticationData>
          <bookingParams>
              <bookingLines>
                <futureBookingState>${data.departureDate}</futureBookingState>
                <departureDate>${data.departureDate}</departureDate>
                <arrivalDate>${data.arrivalDate}</arrivalDate>
                <product>${data.productId}</product>
                <sellContract>${data.sellContract}</sellContract>
                <sellTariff>${data.sellTariff}</sellTariff>
                <sellPriceSheet>${data.sellPriceSheet}</sellPriceSheet>
                <sellCurrency>${data.sellCurrency}</sellCurrency>
                <productVariety>default</productVariety>
                <modality>${data.modality}</modality>
                <adultNumber>${data.adultNumber}</adultNumber>
    `

    template = data.passengers.reduce((template, passenger) => 
    `${template}
      <passengers>
        <name>${passenger.name}</name>
        <surname>${passenger.surname}</surname>
        <age>${passenger.age}</age>
      </passengers>
    `, template)

  template +=
    `
              </bookingLines>
              <holder>
                <name>${user.name}</name>
                <surname>${user.lastname}</surname>
              </holder>
              <onTheFly>false</onTheFly>
              <thirdReference>${reference}</thirdReference>
          </bookingParams>
        </com:bookV2>
      </soapenv:Body>
    </soapenv:Envelope>
    `

  return template
}

module.exports = {
  getavailabilityTemplate,
  getBookingTemplate
}