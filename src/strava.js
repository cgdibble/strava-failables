const { success, failure } = require('@pheasantplucker/failables')
const stravaApi = require('strava-v3');

let stravaClient

const configureStrava = (accessToken) => {
  if (!accessToken) return failure('No access token provided')
  stravaClient = new stravaApi.client(accessToken)
  return success(stravaClient)
}

const getAthlete = async (athleteId) => {
  const result = await stravaApi.athlete.get({id: athleteId})
  return success(result)
}

module.exports = {
    configureStrava,
    getAthlete
}