import { AsyncStorage } from "react-native";

export const FACEBOOK_TOKEN_UPDATE = 'facebook-token/FACEBOOK_TOKEN_UPDATE';

export default (state = '', action) => {
	switch (action.type) {
		case FACEBOOK_TOKEN_UPDATE:
			return action.token;
		default:
			return state;
	}
}

export const setFacebookToken = (token) => {
	AsyncStorage.setItem('facebook_token', token);
	return { type: FACEBOOK_TOKEN_UPDATE, token }
}
