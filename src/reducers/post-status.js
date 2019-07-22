import { Platform } from 'react-native'
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
	try {
		await httpPost(urls.post_game, body, token)
		await route.navigate('Main')
	} catch (error) {
		console.log(error, 'checkPostStatus ERROR')
		dispatch(loaderState(false))
	}
}

export const publish = () => async (dispatch, getState) => {
	const { insta_token, gameResult } = getState()
	dispatch(loaderState(true))
	if (!insta_token) {
		await dispatch(setTabState(3))
		await route.navigate('ProfileSettings')
	} else {
		await postToSocial(
			gameResult,
			'https://www.instagram.com/epocketapp/',
			() => {
				if (gameResult.game_id) {
					setTimeout(() => {
						dispatch(checkPostStatus())
					}, 5000)
				}
			},
			Platform.OS === 'ios' && gameResult.video,
			() => {
				dispatch(loaderState(false))
			},
		)
	}
}

export const waited = () => async (dispatch, getState) => {
	const { token } = getState()
	dispatch(loaderState(true))
	try {
		await httpPost(urls.game_result, JSON.stringify({ status: true, ticker: true }), token)
	} catch (error) {
		console.log(error, 'waited ERROR')
	}
	await route.navigate('Main')
}
