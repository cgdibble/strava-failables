const { isFailure, isSuccess, success, failure } = require('@pheasantplucker/failables')
const stravaApi = require("strava-v3");

let stravaClient

const configureStrava = (accessToken) => {
  if (!accessToken) return failure("No access token provided")
  stravaClient = new stravaApi.client(accessToken)
  return success(stravaClient)
}

const getAthlete = async (athleteId) => {
  console.log('athleteId', athleteId);
  const result = await stravaApi.athlete.get({id: athleteId})
  console.log('result', result);
  return success(result)
}

module.exports = {
    configureStrava,
    getAthlete
}