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
	let outlets = []
	if (lat || lng) {
		dispatch(loaderState(true))
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
			await response.body.outlets.forEach((element) => {
				if (element.price) {
					outlets.push({
						...element,
						location: { latitude: Number(element.lat), longitude: Number(element.lng) },
					})
				}
			})

			dispatch(savePoints(new MAPPOINTS({ outlets })))
		} catch (error) {
			console.log(error, 'getPoints ERROR')
		}
		dispatch(loaderState(false))
	}
}

export const savePoints = (points) => ({ type: SET_POINTS, points })
