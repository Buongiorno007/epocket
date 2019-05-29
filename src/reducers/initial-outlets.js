export const SET_INITIAL_OUTLETS = 'initial_outlets/SET_INITIAL_OUTLETS'

export default (state = { cashouts: [], outlets: [], discounts: [] }, action) => {
	switch (action.type) {
		case SET_INITIAL_OUTLETS:
			return action.outlets
		default:
			return state
	}
}

export const setInitialOutlets = (outlets) => ({
	type: SET_INITIAL_OUTLETS,
	outlets,
})
