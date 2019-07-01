import AsyncStorage from '@react-native-community/async-storage'
// import console = require("console");
export const GAME_STATUS = 'game-status/GAME_STATUS'

export default (state = '', action) => {
	switch (action.type) {
		case GAME_STATUS:
			return action.status
		default:
			return state
	}
}

export const setGameStatus = (status) => {
	return {
		type: GAME_STATUS,
		status,
	}
}
