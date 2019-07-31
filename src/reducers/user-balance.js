export const BALANCE_CHANGE = 'user-balance/BALANCE_CHANGE'

export default (state = 0, action) => {
	switch (action.type) {
		case BALANCE_CHANGE:
			return Number(action.balance)
		default:
			return state
	}
}

export const setBalance = (balance) => async (dispatch) => {
	dispatch(changeBalance(Number(Number(balance).toFixed(2))))
}

export const changeBalance = (balance) => {
	return { type: BALANCE_CHANGE, balance }
}
