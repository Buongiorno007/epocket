import { DEFAULT } from './__proto__'
import { urls } from '@constants/urls'
import { loaderState } from '@reducers/loader'
import { setShowQR } from '@reducers/set-show-qr'
import { httpPost } from '@services/http'
import { handleError } from '@services/http-error-handler'
import route from '@services/route'

const RESULT = '[scanner] RESULT'
const ERROR = '[scanner] ERROR'
const RESET = '[scanner] RESET'

const initialState = new DEFAULT()

export default (state = initialState, action) => {
	switch (action.type) {
		case RESULT:
			return Object.assign({}, { ...state, code: 1 })
		case ERROR:
			return Object.assign({}, { ...state, code: -1, message: action.error.message })
		case RESET:
			return Object.assign({}, { ...initialState })
		default:
			return state
	}
}

export const sendCode = (missin_id, qrCode) => async (dispatch, getState) => {
	dispatch(reset())
	dispatch(loaderState(true))
	dispatch(setShowQR(false))
	const { token } = getState()
	const body = JSON.stringify({ missin_id, qrCode })
	try {
		const response = await httpPost(urls.send_qr_code, body, token)
		dispatch(result())
		dispatch(loaderState(false))
		dispatch(setShowQR(true))
		route.navigate('Photograph')
	} catch (error) {
		error.code = -1
		error.message = handleError(error, body, urls.send_qr_code, token, '', 'sendQRCode')
		dispatch(error(new DEFAULT(error)))
		dispatch(loaderState(false))
		dispatch(setShowQR(true))
	}
}

const result = () => ({ type: RESULT })
const error = (error) => ({ type: ERROR, error })
const reset = () => ({ type: RESET })
