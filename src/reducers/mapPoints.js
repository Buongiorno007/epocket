import { MAPPOINTS } from './__proto__'
//constants
import { urls } from '@constants/urls'
//services
import { httpPost } from '@services/http'
//reducers
import moment from 'moment-timezone'

const SET_POINTS = '[mapPoints] SET_POINTS'
const SET_FILTERS = '[mapPoints] SET_FILTERS'

const initialState = new MAPPOINTS()

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_POINTS:
			return action.points
		case SET_FILTERS:
			return Object.assign({}, { ...state, filters: action.filters })
		default:
			return state
	}
}

export const getPoints = () => async (dispatch, getState) => {
	const { token } = getState()
	const { lat, lng } = getState().location.coordinate

	body = JSON.stringify({
		geolocation_status: lat !== 0 && lng !== 0,
		lat: lat,
		lng: lng,
		tzone: {
			timezone: moment.tz.guess(),
			timedelta: moment().format('Z'),
		},
	})
	if (lat || lng) {
		try {
			const response = await httpPost(urls.outlets, body, token)
			dispatch(savePoints(new MAPPOINTS(response.body)))
		} catch (error) {
			console.log(error, 'getPoints ERROR')
		}
	}
}

export const changeMark = (id, title) => async (dispatch, getState) => {
	const { filters } = getState().mapPoints
	const newFilters = filters
	newFilters
		.filter((item) => item.title === title)[0]
		.data.filter((item) => item.id === id)[0].checked = !filters
		.filter((item) => item.title === title)[0]
		.data.filter((item) => item.id === id)[0].checked
	dispatch(saveFilters(newFilters))
}

export const saveFilters = (filters) => ({ type: SET_FILTERS, filters })
export const savePoints = (points) => ({ type: SET_POINTS, points })
