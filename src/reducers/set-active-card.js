export const SHOW_CARD = 'set-active-card/SHOW_CARD'

export default (state = false, action) => {
	switch (action.type) {
		case SHOW_CARD:
			return action.activeCard
		default:
			return state
	}
}

export const setActiveCard = (activeCard) => ({
	type: SHOW_CARD,
	activeCard,
})
