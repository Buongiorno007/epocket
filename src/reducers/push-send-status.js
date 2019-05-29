export const SET_PUSH_STATUS = 'push-send-status/SET_PUSH_STATUS'

export default (state = false, action) => {
	switch (action.type) {
		case SET_PUSH_STATUS:
			return action.status
		default:
			return state
	}
}

export const setPushStatus = (status) => {
	return {
		type: SET_PUSH_STATUS,
		status,
	}
}
