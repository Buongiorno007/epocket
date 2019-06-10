import AsyncStorage from '@react-native-community/async-storage'

export const INSTA_TOKEN_UPDATE = 'insta-token/INSTA_TOKEN_UPDATE'

export default (state = '', action) => {
	switch (action.type) {
		case INSTA_TOKEN_UPDATE:
			return action.insta_token
		default:
			return state
	}
}

export const setInstaToken = (insta_token) => {
	return { type: INSTA_TOKEN_UPDATE, insta_token }
}
