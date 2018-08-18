export const TIMER_STATUS_CHANGE = 'timer-status/TIMER_STATUS_CHANGE';

export default (state = false, action) => {
    // console.log('timerStatus',action)
	switch (action.type) {
		case TIMER_STATUS_CHANGE:
			return action.timer_status;
		default:
			return state;
	}
}

export const timerStatus = (timer_status) => ({
    type: TIMER_STATUS_CHANGE, timer_status
})
