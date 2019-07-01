import { httpPost } from '@services/http'
import route from '@services/route'
//constants
import { urls } from '@constants/urls'
//redux
import { loaderState } from './loader'

export const checkPostStatus = () => async (dispatch, getState) => {
	const { token, gameResult } = getState()
	let body = JSON.stringify({
		game_id: gameResult.game_id,
	})
	httpPost(urls.post_game, body, token).then(
		(result) => {
			route.navigate('Main')
		},
		(error) => {
			console.log(error, 'ERROR POST STATUS')
			dispatch(loaderState(false))
		},
	)
}
