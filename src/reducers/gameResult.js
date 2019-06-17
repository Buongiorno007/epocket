import { GAME_SUCCESS, GAME_FAILED } from './__proto__'
import AsyncStorage from '@react-native-community/async-storage'
//constants
import { urls } from '@constants/urls'
//services
import { httpPost } from '@services/http'
//reducers
import { loaderState } from '@reducers/loader'
import route from '@services/route'

const GAMERESULT = '[game resutl] GAMERESULT'

const initialState = {}

export default (state = initialState, action) => {
	switch (action.type) {
		case GAMERESULT:
			return action.game
		default:
			return state
	}
}

export const getGameResult = (body) => async (dispatch, getState) => {
	const { token } = getState()
	try {
		const response = await httpPost(urls.game_result, JSON.stringify(body), token)
		// console.log(JSON.stringify(response), 'RESPONSE')
		// console.log(response, 'RESPONSE')
		if (response.body.award) {
			await dispatch(saveGameResult(new GAME_SUCCESS(response.body)))
			route.navigate('Main')
		} else {
			const gameFailed = new GAME_FAILED(response.body)
			await dispatch(saveGameResult(gameFailed))
			await AsyncStorage.setItem('game', JSON.stringify(gameFailed))
			route.navigate('Main')
		}
	} catch (error) {
		//NEED ADD SOMETHING IF NO GAME RESULT
		console.log(error, 'getGameResult ERROR')
		dispatch(loaderState(false))
	}
}

export const saveGameResult = (game) => ({ type: GAMERESULT, game })
