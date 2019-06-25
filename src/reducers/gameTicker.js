import { GAME_TICKER } from './__proto__'

const TICKER = '[ticker] TICKER'
const initialState = new GAME_TICKER()

export default (state = initialState, action) => {
	switch (action.type) {
		case TICKER:
			return action.ticker
		default:
			return state
	}
}

export const saveGameTicker = (ticker) => ({ type: TICKER, ticker })
