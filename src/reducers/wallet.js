import { WALLET } from './__proto__'
//constants
import { urls } from '@constants/urls'
//services
import { httpGet } from '@services/http'
//reducers
import { loaderState } from '@reducers/loader'

const GETWALLET = '[get wallet] GETWALLET'
const initialState = new WALLET()

export default (state = initialState, action) => {
	switch (action.type) {
		case GETWALLET:
			return action.wallet
		default:
			return state
	}
}

export const getHistory = (count = 1, sethistoryEnd) => async (dispatch, getState) => {
	const { token } = getState()
	try {
		const response = await httpGet(urls.get_wallet_history + `${count}`, token)
		console.log(urls.get_wallet_history + `${count}`, response, 'WALLET')
		await dispatch(saveWallet(new WALLET(response.body)))
	} catch (e) {
		console.log(e, 'getHistory error')
		sethistoryEnd(true)
	}
	dispatch(loaderState(false))
}

export const saveWallet = (wallet) => ({ type: GETWALLET, wallet })
