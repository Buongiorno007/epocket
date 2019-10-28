import { BONUSES } from './__proto__'
import { urls } from '@constants/urls'
import { loaderState } from '@reducers/loader'
import { httpGet } from '@services/http'
import route from '@services/route'

const RESULT = '[bonuses] RESULT'
const ERROR = '[bonuses] ERROR'
const RESET = '[bonuses] RESET'

const initialState = new BONUSES()

export default (state = initialState, action) => {
	switch (action.type) {
		case RESULT:
			return Object.assign(
				{},
				{
					...state,
					code: 1,
					currency: action.payload.currency,
					phone: action.payload.phone,
					max: action.payload.max,
					min: action.payload.min,
					tax: action.payload.tax,
					value: action.payload.value,
				},
			)
		case ERROR:
			return Object.assign(
				{},
				{
					...state,
					code: -1,
					currency: action.error.currency,
					phone: action.error.phone,
					max: action.error.max,
					min: action.error.min,
					tax: action.error.tax,
					value: action.error.value,
				},
			)
		case RESET:
			return Object.assign({}, { ...initialState })
		default:
			return state
	}
}

export const request = () => async (dispatch, getState) => {
	dispatch(reset())
	dispatch(loaderState(true))
	const { currency, phone } = getState().profileState
	try {
		const { token } = getState()
		const response = await httpGet(urls.get_received_bonuses, token)
		console.log('phone_wallet', response)
		response.body.phone = phone
		response.body.currency = currency
		const body = new BONUSES(response.body)
		if (body.max === 0 || body.max < body.min) {
			route.navigate('RefillFinish', { condition: 'fail' })
		}
		dispatch(result(body))
		dispatch(loaderState(false))
	} catch (error) {
		error.phone = phone
		error.currency = currency
		const body = new BONUSES(error)
		if (body.max === 0) {
			route.navigate('RefillFinish', { condition: 'fail' })
		}
		dispatch(error(new BONUSES(body)))
		dispatch(loaderState(false))
	}
}

export const result = (payload) => ({ type: RESULT, payload })
export const error = (error) => ({ type: ERROR, error })
export const reset = () => ({ type: RESET })
