export const WAIT_TIMER = 'game-expired-timer/WAIT_TIMER'
import { Platform } from 'react-native'
//services
import { httpPost } from '../services/http'
import { handleError } from '../services/http-error-handler'
import { convertToBase64 } from '../services/convert-to-base64'
//redux
import { loaderState } from './loader'
import { setGameStatus } from './game-status'
import { setGameExpiredImage } from './game-expired-image'
import { errorState } from './game-error'
import { getGameInfo } from './game-info'
//constants
import { ICONS } from '../constants/icons'
import { urls } from '../constants/urls'
// import console = require("console");

export default (state = 10, action) => {
	switch (action.type) {
		case WAIT_TIMER:
			return action.time
		default:
			return state
	}
}
export const shutDownExpiredTimer = (token, id, lat, ln) => async (dispatch) => {
	let body = {
		is_played: 'True',
		id,
	}
	let received_promise = httpPost(urls.game_expired_timer, JSON.stringify(body), token)
	received_promise.then(
		(result) => {
			let time = result.body.time
			dispatch(setGameExpiredTimer(time))
			dispatch(setGameStatus('start'))
			dispatch(getGameInfo(token, lat, ln))
			dispatch(errorState(null))
		},
		(error) => {
			let error_response = handleError(
				error,
				body,
				urls.game_expired_timer,
				token,
				'game-expired-time',
				'shutDownExpiredTimer',
			)
			dispatch(errorState(error_response))
			dispatch(loaderState(false))
		},
	)
}
export const launchGameExpiredTimer = (token, id) => async (dispatch) => {
	dispatch(loaderState(true))
	let body = {}
	if (id) {
		body = {
			is_played: 'False',
			id,
		}
	}
	let received_promise = httpPost(urls.game_expired_timer, JSON.stringify(body), token)
	received_promise.then(
		(result) => {
			let time = result.body.time
			let oldresult = result
			if (oldresult.body.video_status && Platform.OS === 'ios') {
				let id = oldresult.body.image.split('_correct')[0].split('id')[1]
				dispatch(
					setGameExpiredImage({
						id: id,
						img: oldresult.body.image,
						video: oldresult.body.video_status ? oldresult.body.video : false,
						brand_name: oldresult.body.brand_name,
						game_link: oldresult.body.game_link,
						brand_link: oldresult.body.brand_link,
					}),
				)
				dispatch(setGameExpiredTimer(time))
				if (time === 0) {
					dispatch(setGameStatus('start'))
				} else {
					dispatch(setGameStatus('expired'))
				}
				dispatch(errorState(null))
				dispatch(loaderState(false))
			} else {
				convertToBase64(oldresult.body.image).then(
					(result) => {
						let id = oldresult.body.image.split('_correct')[0].split('id')[1]
						dispatch(
							setGameExpiredImage({
								id: id,
								img: oldresult.body.image,
								base64: 'data:image/jpg;base64,' + result,
								video: false,
								brand_name: oldresult.body.brand_name,
								game_link: oldresult.body.game_link,
								brand_link: oldresult.body.brand_link,
							}),
						)
						dispatch(setGameExpiredTimer(time))
						if (time === 0) {
							dispatch(setGameStatus('start'))
						} else {
							dispatch(setGameStatus('expired'))
						}
						dispatch(errorState(null))
						dispatch(loaderState(false))
					},
					(error) => {},
				)
			}
		},
		(error) => {
			let error_response = handleError(
				error,
				body,
				urls.game_expired_timer,
				token,
				'game-expired-time',
				'launchGameExpiredTimer',
			)
			dispatch(errorState(error_response))
			dispatch(loaderState(false))
		},
	)
}
export const setGameExpiredTimer = (time) => {
	return {
		type: WAIT_TIMER,
		time,
	}
}
export const setError = (error) => ({
	type: GAME_ERROR,
	error,
})
