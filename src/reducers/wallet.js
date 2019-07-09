import { WALLET } from './__proto__'
//constants
// import { urls } from '@constants/urls'
//services
// import { httpPost } from '@services/http'
//reducers
// import route from '@services/route'

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

export const saveWallet = (wallet) => ({ type: GETWALLET, wallet })
