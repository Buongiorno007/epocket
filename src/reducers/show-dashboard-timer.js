export const UPDATE_DASHBOARD_TIMER = 'show-dashboard-timer/UPDATE_DASHBOARD_TIMER '

export default (state = false, action) => {
	switch (action.type) {
		case UPDATE_DASHBOARD_TIMER:
			return action.timer
		default:
			return state
	}
}

export const showTimer = (timer) => ({
	type: UPDATE_DASHBOARD_TIMER,
	timer,
})
