export const SHOW_DONE_NOTIFICATION = 'SHOW_DONE_NOTIFICATION'

export default (state = false, action) => {
	switch (action.type) {
		case SHOW_DONE_NOTIFICATION:
			return action.doneNotification
		default:
			return state
	}
}

export const showDoneNotification = (doneNotification) => ({
	type: SHOW_DONE_NOTIFICATION,
	doneNotification,
})
