
import { AUTH } from './__proto__'
import { urls } from '@constants/urls'
import { loaderState } from '@reducers/loader'
import { httpPost } from '@services/http'
import I18n from '@locales/I18n'
import route from '@services/route'

const RESULT = '[send code] RESULT'
const ERROR = '[send code] ERROR'
const RESET = '[send code] RESET'

const initialState = new AUTH()

export default (state = initialState, action) => {
	switch (action.type) {
		case RESULT:
			return Object.assign({}, { ...state, code: 1 })
		case ERROR:
			return Object.assign({}, { ...state, code: -1 })
		case RESET:
			return Object.assign({}, { ...initialState })
		default:
			return state
	}
}

export const sendCode = (phone) => async (dispatch) => {
	dispatch(reset())
	dispatch(loaderState(true))
	try {
		const body = JSON.stringify({ phone })
		const response = await httpPost(urls.re_send_code, body)
		dispatch(result())
		dispatch(loaderState(false))
	} catch (e) {
		e.code = -1
		dispatch(error())
		dispatch(loaderState(false))
	}
}

const result = (payload) => ({ type: RESULT, payload })
const error = (error) => ({ type: ERROR, error })
const reset = () => ({ type: RESET })
