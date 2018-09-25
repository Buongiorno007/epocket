import { AsyncStorage } from "react-native";
 
export const INSTA_TOKEN_UPDATE = 'insta_token/INSTA_TOKEN_UPDATE';

export default (state = '', action) => {
	switch (action.type) {
		case INSTA_TOKEN_UPDATE:
            return action.insta_token;
		default:
			return state;
	}
}

export const setInstaToken = (insta_token) => {
	AsyncStorage.setItem('insta_token', insta_token);
	return { type: INSTA_TOKEN_UPDATE, insta_token }
}
