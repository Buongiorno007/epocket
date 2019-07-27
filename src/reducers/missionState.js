import { MISSIONSTATE } from './__proto__'
//constants
import { urls } from '@constants/urls'
//services
import { httpPost } from '@services/http'
//reducers
import { loaderState } from '@reducers/loader'
import moment from 'moment-timezone'

const SET_MISSION_RADIUS = '[missionState] SET_MISSION_RADIUS'

const initialState = new MISSIONSTATE()

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_MISSION_RADIUS:
			return Object.assign({}, { ...state, inRadius: action.radius })
		default:
			return state
	}
}

export const setMissionRadius = (radius) => ({ type: SET_MISSION_RADIUS, radius })
