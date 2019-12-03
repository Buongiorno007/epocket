export const CHANGE_TRIGGERINFOSP_STATE = 'triggerInfoSp/CHANGE_TRIGGERINFOSP_STATE'

export default (state = false, action) => {
	switch (action.type) {
		case CHANGE_TRIGGERINFOSP_STATE:
			return action.triggerInfoSp
		default:
			return state
	}
}

export const triggerInfoSpSet = (triggerInfoSp) => ({
	type: CHANGE_TRIGGERINFOSP_STATE,
	triggerInfoSp,
})
