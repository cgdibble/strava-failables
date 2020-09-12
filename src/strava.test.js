const { assertSuccess, assertFailure, assertSuccessWhich } = require('@pheasantplucker/failables')
const { configureStrava, getAthlete } = require("./strava")
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
			console.log('STRAVA_ACCESS_TOKEN', STRAVA_ACCESS_TOKEN);
			const athleteId = 14547931
			const result = await getAthlete(athleteId);
			assertSuccessWhich((athlete) => athlete.id = athleteId, result)
		})
		// Skipped because Strava API seems to only return the one athelete regardless
		// this is not ideal, but the goal is to get a tool to look at my data
		// so punting that weirdness for now.
		it.skip('should fail if no athleteId', async () => {
			const result = await getAthlete(16655995)
			assertFailure(result)
		})
	})
});