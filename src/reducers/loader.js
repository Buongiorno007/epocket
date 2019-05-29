export const CHANGE_LOADER_STATE = 'loader/CHANGE_LOADER_STATE'

export default (state = false, action) => {
	switch (action.type) {
		case CHANGE_LOADER_STATE:
			return action.loader
		default:
			return state
	}
}

export const loaderState = (loader) => ({
	type: CHANGE_LOADER_STATE,
	loader,
})
