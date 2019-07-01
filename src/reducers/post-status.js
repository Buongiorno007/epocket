//constants
import { urls } from '@constants/urls'
//redux
import { loaderState } from './loader'
import { setTabState } from '@reducers/tabs'
//services
import route from '@services/route'
import { httpPost } from '@services/http'
import { postToSocial } from '@services/post-to-social'

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

// export const publish = () => async (dispatch, getState) => {
// 	const { insta_token, gameResult } = getState()
// 	dispatch(loaderState(true))
// 	if (!insta_token) {
// 		await dispatch(setTabState(3))
// 		await route.navigate('ProfileSettings')
// 	} else {
// 		postToSocial(
// 			gameResult,
// 			'https://www.instagram.com/epocketapp/',
// 			this.confirmPost,
// 			Platform.OS === 'ios' && gameResult.video,
// 		)
// 	}
// }
// confirmPost = () => {
// 	if (gameResult.game_id) {
// 		setTimeout(() => {
// 			dispatch(checkPostStatus())
// 		}, 5000)
// 	}
// }
