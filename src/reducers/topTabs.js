export const CHANGE_ACTIVE_TOP_TAB = '[topTabs] CHANGE_ACTIVE_TOP_TAB'

export default (state = 0, action) => {
	switch (action.type) {
		case CHANGE_ACTIVE_TOP_TAB:
			return action.activeTab
		default:
			return state
	}
}

export const setTopTabs = (activeTab) => async (dispatch) => {
	dispatch(setTabs(activeTab))
}

export const setTabs = (activeTab) => ({
	type: CHANGE_ACTIVE_TOP_TAB,
	activeTab,
})
