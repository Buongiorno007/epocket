import { AppState } from 'react-native'
export const APP_STATE_CHANGE = 'app-state/APP_STATE_CHANGE'

export default (state = AppState.currentState, action) => {
	switch (action.type) {
		case APP_STATE_CHANGE:
			return action.data
		default:
			return state
	}
}

export const setAppState = (data) => {
	return {
		type: APP_STATE_CHANGE,
		data,
	}
}
