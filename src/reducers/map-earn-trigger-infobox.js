export const CHANGE_TRIGGERINFO_STATE = 'triggerInfo/CHANGE_TRIGGERINFO_STATE'

export default (state = false, action) => {
	switch (action.type) {
		case CHANGE_TRIGGERINFO_STATE:
			return action.triggerInfo
		default:
			return state
	}
}

export const triggerInfoSet = (triggerInfo) => ({
	type: CHANGE_TRIGGERINFO_STATE,
	triggerInfo,
})
