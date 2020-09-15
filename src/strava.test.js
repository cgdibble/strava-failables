const { assertSuccess, assertFailure, assertSuccessWhich } = require('@pheasantplucker/failables');
const { configureStrava, getAthlete, getAllActivities, getToken, getGearItem } = require('./strava');
const stravaApi = require('strava-v3');

const {
	STRAVA_SPECIFIC_ACCESS_TOKEN,
	STRAVA_ACCESS_TOKEN,
	STRAVA_CLIENT_ID,
	STRAVA_CLIENT_SECRET
} = process.env;

const stravaConfig = {
	'access_token': STRAVA_ACCESS_TOKEN,
	'client_id': STRAVA_CLIENT_ID,
	'client_secret': STRAVA_CLIENT_SECRET,
	'redirect_uri': 'http://localhost:3000'
};
describe('strava.js', () => {
	// my athlete id
	const athleteId = 14547931;

	describe.skip('getToken()', () => {
		// these two are used to get the access token to run the other requests
		it('should get a valid token', async () => {
			configureStrava(stravaConfig);
			const result = await getToken();
			console.log('result', result);
		});

		it('should things', async () => {
			// use the url output from above and in the browser get access. The redirect to localhost will
			// have the `code` in the URL. That code goes here as STRAVA_SPECIFIC_ACCESS_TOKEN
			const payload = await stravaApi.oauth.getToken(STRAVA_SPECIFIC_ACCESS_TOKEN);
			console.log('payload', payload);
		});
	});
	
	describe('configureStrava()', () => {
		it('should fail when no access token provided', () => {
			const result = configureStrava();
			assertFailure(result);
		});

		it('should create client when given an access token', () => {
			const result = configureStrava(stravaConfig);
			assertSuccess(result);
		});
	});
	
	describe('Athletes', () => {
		beforeAll(() => {
			configureStrava(stravaConfig);
		});

		it('should get the athlete data', async () => {
			const result = await getAthlete(athleteId);
			assertSuccessWhich((athlete) => athlete.id = athleteId, result);
		});
		// Skipped because Strava API seems to only return the one athelete regardless
		// this is not ideal, but the goal is to get a tool to look at my data
		// so punting that weirdness for now. This is likely because of my use of the access token.
		// Confirmed: https://www.npmjs.com/package/strava-v3#overriding-the-default-access_token
		it.skip('should fail if no valid access token', async () => {
			const result = await getAthlete(1);
			assertFailure(result);
		});
	});

	describe('Activities', () => {
		it('should get the activities', async () => {
			const result = await getAllActivities(athleteId);
			assertSuccess(result);
		});
	});

	describe('Gear', () => {
		const gearId = 'b5473525'
		it('should get the gear', async () => {
			const result = await getGearItem(gearId)
			console.log('result', result);
			assertSuccess(result)
		})
	})
});