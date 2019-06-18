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

const initialState = new GAME_RESULT()

export default (state = initialState, action) => {
	switch (action.type) {
		case GAMERESULT:
			return Object.assign(
				{},
				{
					...state,
					ticker: action.game.tiker,
					award: action.game.award,
					insta_img: action.game.insta_img,
					video: action.game.video,
					link: action.game.brand_link,
					timer: action.game.timer,
				},
			)
		default:
			return state
	}
}

export const getGameResult = (body) => async (dispatch, getState) => {
	const { token } = getState()
	try {
		const response = await httpPost(urls.game_result, JSON.stringify(body), token)
		console.log(response, 'RESPONSE')
		const gameResult = new GAME_RESULT(response.body)
		await dispatch(saveGameResult(gameResult))
		if (response.body.message) {
			route.navigate('GameSuccess')
		} else {
			await AsyncStorage.setItem('game', JSON.stringify(gameResult))
			route.navigate('Main')
		}
	} catch (error) {
		//NEED ADD SOMETHING IF NO GAME RESULT
		console.log(error, 'getGameResult ERROR')
		dispatch(loaderState(false))
	}
}

export const saveGameResult = (game) => ({ type: GAMERESULT, game })
