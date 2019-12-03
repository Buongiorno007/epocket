export const CHANGE_TRIGGER_STATE = 'trigger/CHANGE_TRIGGER_STATE'

export default (state = false, action) => {
	switch (action.type) {
		case CHANGE_TRIGGER_STATE:
			return action.trigger
		default:
			return state
	}
}

export const triggerSet = (trigger) => ({
	type: CHANGE_TRIGGER_STATE,
	trigger,
})
