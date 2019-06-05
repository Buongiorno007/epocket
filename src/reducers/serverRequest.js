export const SERVER_REQUEST = 'serverrequest/SERVER_REQUEST'

export default (state = false, action) => {
	switch (action.type) {
		case SERVER_REQUEST:
			return action.server
		default:
			return state
	}
}

export const updateServerRequest = (server) => ({
	type: SERVER_REQUEST,
	server,
})
