import { Platform } from 'react-native'
import { GAME_START } from './__proto__'
//constants
import { urls } from '@constants/urls'
//services
import { httpGet } from '@services/http'
//reducers
import { loaderState } from '@reducers/loader'

const GAMESTART = '[game start] GAMESTART'

const initialState = new GAME_START()

export default (state = initialState, action) => {
	switch (action.type) {
		case GAMESTART:
			return action.game
		default:
			return state
	}
}

export const getGameStart = (lat, lng, token) => async (dispatch) => {
	try {
		const response = await httpGet(urls.new_game_get + '?coords=' + lat + '%2C' + lng, token)
		await dispatch(saveGameStart(new GAME_START(response.body)))
		dispatch(loaderState(false))
	} catch (error) {
		console.log(error, 'getGameStart ERROR')
		dispatch(loaderState(false))
	}
}

export const saveGameStart = (game) => ({ type: GAMESTART, game })
