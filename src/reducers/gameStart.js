import { Platform } from 'react-native'
import { GAME_START, GAME_RESULT, GAME_TICKER } from './__proto__'
//constants
import { urls } from '@constants/urls'
//services
import { httpGet } from '@services/http'
//reducers
import { loaderState } from '@reducers/loader'
import { saveGameResult } from '@reducers/gameResult'
import { saveGameTicker } from '@reducers/gameTicker'
import route from '@services/route'
import { setGameStatus } from '@reducers/game-status'

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

export const getGameStart = () => async (dispatch, getState) => {
	const { token } = getState()
	const { lat, lng } = getState().location.coordinate
	dispatch(loaderState(true))
	try {
		const response = await httpGet(urls.new_game_get + '?coords=' + lat + '%2C' + lng, token)
		console.log(response, 'GAMESSSSS')
		if (response.body.type === 'game') {
			await dispatch(saveGameResult(new GAME_RESULT(response.body)))
			route.navigate('GameFailed')
		} else if (response.body.type === 'ticker') {
			await dispatch(saveGameTicker(new GAME_TICKER(response.body)))
			await dispatch(setGameStatus('ticker'))
		} else {
			await dispatch(saveGameStart(new GAME_START(response.body)))
			await dispatch(setGameStatus(''))
		}
		dispatch(loaderState(false))
	} catch (error) {
		console.log(error, 'getGameStart ERROR')
		if (error.body.message === "game not have" ) {
			dispatch(saveGameStart(new GAME_START()))
		}
		dispatch(loaderState(false))
		route.navigate('Main')
	}
}

export const saveGameStart = (game) => ({ type: GAMESTART, game })
