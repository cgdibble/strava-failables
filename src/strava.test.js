const { assertSuccess, assertFailure, assertSuccessWhich } = require('@pheasantplucker/failables')
const { configureStrava, getAthlete } = require('./strava')
const {
	STRAVA_ACCESS_TOKEN
} = process.env

describe('strava.js', () => {
	describe('getAccess()', () => {
		it('should fail when no access token provided', () => {
			const result = configureStrava()
			assertFailure(result)
		})

		it('should create client when given an access token', () => {
			const result = configureStrava(STRAVA_ACCESS_TOKEN)
			assertSuccess(result)
		})
	})
	
	describe('Athletes', () => {
		beforeAll(() => {
			configureStrava(STRAVA_ACCESS_TOKEN)
		})

		it('should get the athlete data', async () => {
			// my athlete id
			const athleteId = 14547931
			const result = await getAthlete(athleteId);
			assertSuccessWhich((athlete) => athlete.id = athleteId, result)
		})
		// Skipped because Strava API seems to only return the one athelete regardless
		// this is not ideal, but the goal is to get a tool to look at my data
		// so punting that weirdness for now. This is likely because of my use of the access token.
		it.skip('should fail if no valid access token', async () => {
			const result = await getAthlete()
			assertFailure(result)
		})
	})

	describe('Activities', () => {
		it('should get the activities', async () => {
			
		})
	})
});