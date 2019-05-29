export const NAVIGATE_TO_MALL = 'navigate-to-mall/NAVIGATE_TO_MALL'

export default (state = false, action) => {
	switch (action.type) {
		case NAVIGATE_TO_MALL:
			return action.status
		default:
			return state
	}
}

export const setNavigateToMall = (status) => ({
	type: NAVIGATE_TO_MALL,
	status,
})
