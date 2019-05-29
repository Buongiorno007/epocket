export const SET_GAME_EXPIRED_IMAGE = './game-expired-image/SET_GAME_EXPIRED_IMAGE'
//constants
import { ICONS } from '../constants/icons'
const initState = {
	id: 0,
	img: ICONS.FILLER,
	base64: ICONS.FILLER,
	video: false,
}
export default (state = initState, action) => {
	switch (action.type) {
		case SET_GAME_EXPIRED_IMAGE:
			return action.data
		default:
			return state
	}
}

export const setGameExpiredImage = (data) => {
	return {
		type: SET_GAME_EXPIRED_IMAGE,
		data,
	}
}
