import { Alert } from 'react-native'
import { DEFAULT } from './__proto__'
import { urls } from '@constants/urls'
import { loaderState } from '@reducers/loader'
import { setBalance } from '@reducers/user-balance'
import { httpPost } from '@services/http'
import I18n from '@locales/I18n'
import route from '@services/route'

const RESULT = '[refill] RESULT'
const ERROR = '[refill] ERROR'
const RESET = '[refill] RESET'

const initialState = new DEFAULT()

export default (state = initialState, action) => {
	switch (action.type) {
		case RESULT:
			return Object.assign({}, { ...state, code: 1 })
		case ERROR:
			return Object.assign({}, { ...state, code: action.error.code })
		case RESET:
			return Object.assign({}, { ...initialState })
		default:
			return state
	}
}

export const payment = (amount, type = 'true') => async (dispatch, getState) => {
	dispatch(reset())
	dispatch(loaderState(true))
	try {
		const { token } = getState()
		const body = JSON.stringify({ amount, type })
		const response = await httpPost(urls.refill_mobile, body, token)
		dispatch(setBalance(response.body.user_wallet_amount))
		dispatch(result())
		route.navigate('RefillFinish', { condition: 'success' })
	} catch (e) {
		dispatch(error(new DEFAULT(e)))
		dispatch(loaderState(false))
		Alert.alert(I18n.t('TITLE'), `code: ${e.code}`, [{ text: 'OK', onPress: () => {} }], { cancelable: false })
	}
}

export const result = (payload) => ({ type: RESULT, payload })
export const error = (error) => ({ type: ERROR, error })
export const reset = () => ({ type: RESET })
