export const SET_MAIN_MISSION_COST = 'SET_MAIN_MISSION_COST'

export default (state = 0, action) => {
	switch (action.type) {
		case SET_MAIN_MISSION_COST:
			return action.cost
		default:
			return state
	}
}

export const setMainMissionCost = (cost) => ({
	type: SET_MAIN_MISSION_COST,
	cost,
})
