export const SET_OUTLETS = 'distance/SET_OUTLETS';

export default (state = [], action) => {
	switch (action.type) {
		case SET_OUTLETS:
			return action.outlets;
		default:
			return state;
	}
}

export const setOutlets = (outlets) => ({
	type: SET_OUTLETS, outlets
})

