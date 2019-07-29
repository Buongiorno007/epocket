import { MISSIONSTATE } from './__proto__'
//constants
import { urls } from '@constants/urls'
//services
import { httpPost } from '@services/http'
//reducers

const SET_MISSION_RADIUS = '[missionState] SET_MISSION_RADIUS'
const SET_MISSION_TIMER = '[missionState] SET_MISSION_TIMER'
const SET_MISSION_FAIL_TIMER = '[missionState] SET_MISSION_FAIL_TIMER'
const SET_MISSION = '[missionState] SET_MISSION'

const initialState = new MISSIONSTATE()

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_MISSION_RADIUS:
			return Object.assign({}, { ...state, inRadius: action.radius })
		case SET_MISSION_TIMER:
			return Object.assign({}, { ...state, timer: action.timer })
		case SET_MISSION_FAIL_TIMER:
			return Object.assign({}, { ...state, failTimer: action.failTimer })
		case SET_MISSION:
			return action.mission
		default:
			return state
	}
}

export const checkMission = (id) => async (dispatch, getState) => {
	const { missionState } = getState()
	if (id !== missionState.outletId) {
		await dispatch(getMission(id))
	} else {
		await dispatch(setMissionRadius(true))
	}
}

export const getMission = (id) => async (dispatch, getState) => {
	const { token } = getState()
	let body = {
		outlet_id: id,
	}
	try {
		const response = await httpPost(urls.start_mission, JSON.stringify(body), token)
		console.log(response, 'RESPONSE')
		await dispatch(setMission(new MISSIONSTATE(response.body)))
	} catch (e) {
		console.log(e, 'checkMission')
	}
}

export const setMission = (mission) => ({ type: SET_MISSION, mission })
export const setMissionRadius = (radius) => ({ type: SET_MISSION_RADIUS, radius })
export const setMissionTimer = (timer) => ({ type: SET_MISSION_TIMER, timer })
export const setMissionFailtTimer = (failTimer) => ({ type: SET_MISSION_FAIL_TIMER, failTimer })
