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

const confirmPost = (bool) => {
	if (bool) {
		setTimeout(() => {
			dispatch(checkPostStatus())
		}, 5000)
	}
}

export const publish = () => async (dispatch, getState) => {
	const { insta_token, gameResult } = getState()
	dispatch(loaderState(true))
	if (!insta_token) {
		await dispatch(setTabState(3))
		await route.navigate('ProfileSettings')
	} else {
		postToSocial(
			gameResult,
			'https://www.instagram.com/epocketapp/',
			confirmPost(gameResult.game_id),
			Platform.OS === 'ios' && gameResult.video,
		)
	}
}

export const waited = async (dispatch) => {
	dispatch(loaderState(true))
	try {
		await httpPost(urls.game_result, JSON.stringify({ status: true, ticker: true }), token)
	} catch (error) {
		console.log(error, 'waited ERROR')
	}
	await route.navigate('Main')
}
