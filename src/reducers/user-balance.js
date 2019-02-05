import { AsyncStorage } from 'react-native'
import { getBonuses } from "./history-bonuses";

export const BALANCE_CHANGE = 'user-balance/BALANCE_CHANGE';

export default (state = false, action) => {
	switch (action.type) {
		case BALANCE_CHANGE:
			return Number(action.balance);
		default:
			return state;
	}
}

export const setBalance = (balance) => async dispatch => {
	let token
	AsyncStorage.getItem('token').then((value) => {
		token = value;
	});
	dispatch(getBonuses(token, 10, 10))
	balance = Number(Number(balance).toFixed(2))
	AsyncStorage.setItem("balance", String(balance));
	dispatch(changeBalance(balance))
}
export const changeBalance = (balance) => {
	return { type: BALANCE_CHANGE, balance }
}
// ({
// 	type: BALANCE_CHANGE, balance
// })
