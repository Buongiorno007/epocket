import { AUTH } from './__proto__'
import { urls } from '@constants/urls'
import { loaderState } from '@reducers/loader'
import { httpPost } from '@services/http'
import I18n from '@locales/I18n'
import route from '@services/route'

const RESULT = '[sign-in] RESULT'
const ERROR = '[sign-in] ERROR'
const RESET = '[sign-in] RESET'

const initialState = new AUTH()

export default (state = initialState, action) => {
	switch (action.type) {
		case RESULT:
			return Object.assign({}, { ...state, code: 1, phone: action.payload.phone })
		case ERROR:
			return Object.assign({}, { ...state, code: -1, phone: action.error.phone })
		case RESET:
			return Object.assign({}, { ...initialState })
		default:
			return state
	}
}

export const signIn = (phone) => async (dispatch) => {
	dispatch(reset())
	dispatch(loaderState(true))
	try {
		const body = JSON.stringify({ phone })
		const response = await httpPost(urls.sing_in, body)
		response.phone = phone
		route.navigate('ConfirmCode', {
			back: 'SignIn',
			title: I18n.t('SIGN_IN_TITLE'),
		})
		dispatch(result(new AUTH(response)))
		dispatch(loaderState(false))
	} catch (e) {
		e.code = -1
		dispatch(error(new AUTH(e)))
		dispatch(loaderState(false))
	}
}

const result = (payload) => ({ type: RESULT, payload })
const error = (error) => ({ type: ERROR, error })
const reset = () => ({ type: RESET })
