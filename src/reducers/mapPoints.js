import { MAPPOINTS } from './__proto__'
//constants
import { urls } from '@constants/urls'
//services
import { httpPost } from '@services/http'
//reducers
import { loaderState } from '@reducers/loader'
import moment from 'moment-timezone'

const SET_POINTS = '[mapPoints] SET_POINTS'

const initialState = new MAPPOINTS()

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_POINTS:
			return action.points
		default:
			return state
	}
}

export const getPoints = () => async (dispatch, getState) => {
	const { token } = getState()
	const { lat, lng } = getState().location.coordinate
	if (lat || lng) {
		try {
			const response = await httpPost(
				urls.outlets,
				JSON.stringify({
					geolocation_status: lat !== 0 && lng !== 0,
					lat: lat,
					lng: lng,
					tzone: {
						timezone: moment.tz.guess(),
						timedelta: moment().format('Z'),
					},
				}),
				token,
			)
			dispatch(savePoints(new MAPPOINTS(response.body)))
			console.log(response, 'RESPONSE')
		} catch (error) {
			console.log(error, 'getPoints ERROR')
		}
	}
}

export const savePoints = (points) => ({ type: SET_POINTS, points })
