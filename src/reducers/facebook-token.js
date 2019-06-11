import AsyncStorage from '@react-native-community/async-storage'

export const FACEBOOK_TOKEN_UPDATE = 'facebook-token/FACEBOOK_TOKEN_UPDATE'

export default (state = true, action) => {
	switch (action.type) {
		case FACEBOOK_TOKEN_UPDATE:
			return action.token
		default:
			return state
	}
}

export const setFacebookToken = (token) => {
	return { type: FACEBOOK_TOKEN_UPDATE, token }
}
