import { AsyncStorage } from 'react-native'

export const BALANCE_CHANGE = 'user-balance/BALANCE_CHANGE';

export default (state = false, action) => {
	switch (action.type) {
		case BALANCE_CHANGE:
			// console.log('BALANCE_CHANGE',action)
			return Math.round(action.balance);
		default:
			return state;
	}
}

export const setBalance = (balance) => {
	console.log("balance", balance)
	AsyncStorage.setItem("balance", String(balance));
	return { type: BALANCE_CHANGE, balance }
}

// ({
// 	type: BALANCE_CHANGE, balance
// })
