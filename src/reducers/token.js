export const TOKEN_UPDATE = 'token/TOKEN_UPDATE';

export default (state = null, action) => {
	switch (action.type) {
		case TOKEN_UPDATE:
            return action.token;
		default:
			return state;
	}
}

export const setToken = (token) => ({
    type: TOKEN_UPDATE, token 
})