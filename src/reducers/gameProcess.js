import { Platform } from 'react-native'
import { GAME_PROCESS } from './__proto__'
//constants
import { urls } from '@constants/urls'
//services
import { httpPut } from '@services/http'
//reducers
import { loaderState } from '@reducers/loader'

const GAMEPROCESS = '[game process] GAMEPROCESS'

const initialState = new GAME_PROCESS()

export default (state = initialState, action) => {
	switch (action.type) {
		case GAMEPROCESS:
			return action.game
		default:
			return state
	}
}

export const getGameProcess = () => async (dispatch, getState) => {
	dispatch(loaderState(true))
	const { token, gameStart } = getState()
	try {
		const response = await httpPut(urls.get_a_game, JSON.stringify({ id: gameStart.id }), token)
		await dispatch(saveGameProcess(new GAME_PROCESS(response.body)))
		// dispatch(loaderState(false))
	} catch (error) {
		console.log(error, 'getGameProcess ERROR')
		// dispatch(loaderState(false))
	}
}

export const saveGameProcess = (game) => ({ type: GAMEPROCESS, game })
