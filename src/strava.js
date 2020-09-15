const { success, failure } = require('@pheasantplucker/failables');
const stravaApi = require('strava-v3');

let stravaClient;

const getToken = async () => {
  const allAccess = 'read,read_all,profile:read_all,profile:write,activity:read,activity:read_all,activity:write';
  const url = stravaApi.oauth.getRequestAccessURL({scope: allAccess});
  return url;
};

const configureStrava = (config) => {
  if (!config) return failure('No access token provided');
  stravaClient = new stravaApi.config(config);
  return success(stravaClient);
};

const getAthlete = async (athleteId) => {
  const result = await stravaApi.athlete.get({id: athleteId});
  return success(result);
};

const getAllActivities = async (athleteId) => {
  const result = await stravaApi.athlete.listActivities({id: athleteId});
  return success(result);
};
module.exports = {
    configureStrava,
    getAthlete,
    getAllActivities,
    getToken
};