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

export const changeMark = (id) => async (dispatch, getState) => {
	const { filters } = getState().mapPoints
	let newFilter = filters
	newFilter.forEach((element) => {
		element.data.forEach((item) => {
			if (item.id === id) item.checked = !item.checked
		})
	})

	dispatch(saveFilters(newFilter))
}

export const useFilters = (body) => async (dispatch, getState) => {
	const { token } = getState()
	try {
		const response = await httpPost(urls.filters, body, token)
		console.log(response, 'RESPONSE ON FILTERS')
	} catch (e) {
		console.log(e, 'RRRR')
	}
}

export const saveFilters = (filters) => ({ type: SET_FILTERS, filters })
export const savePoints = (points) => ({ type: SET_POINTS, points })
