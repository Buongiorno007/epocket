import { setGameStatus } from './game-status'

export const CHANGE_ACTIVE_TAB = 'tabs/CHANGE_ACTIVE_TAB'

export default (state = 0, action) => {
	switch (action.type) {
		case CHANGE_ACTIVE_TAB:
			return action.activeTab
		default:
			return state
	}
}

export const setTabState = (activeTab) => async (dispatch) => {
	if (activeTab > 0) {
		dispatch(setGameStatus('initial'))
	}
	dispatch(setTab(activeTab))
}

export const setTab = (activeTab) => ({
	type: CHANGE_ACTIVE_TAB,
	activeTab,
})
