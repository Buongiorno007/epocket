import { AUTH } from './__proto__'
import { urls } from '@constants/urls'
import { loaderState } from '@reducers/loader'
import { setBalance } from '@reducers/user-balance'
import { setToken } from '@reducers/token'
import { saveUser } from '@reducers/profile-state'
import { setColor } from '@reducers/user-color'
import { httpPost } from '@services/http'
import { toAge } from '@services/converteDate'
import route from '@services/route'
import I18n from '@locales/I18n'

const RESULT = '[sign-in-confirm] RESULT'
const ERROR = '[sign-in-confirm] ERROR'
const RESET = '[sign-in-confirm] RESET'

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

export const signInConfirm = (number, code = '123456') => async (dispatch, getState) => {
	dispatch(reset())
	dispatch(loaderState(true))
	try {
		const body = JSON.stringify({ phone: number, code })
		const response = await httpPost(urls.sing_in_confirm, body)
		const user = {
			name: response.body.user_name,
			phone: body.phone,
			photo: response.body.photo,
			sex: response.body.sex ? 1 : 0,
			currency: I18n.locale === 'ru' ? response.body.currency_plural : response.body.currency,
			birthDay: toAge(response.body.birth_day),
		}
		dispatch(saveUser(user))
		dispatch(setToken(response.body.token))
		dispatch(setColor(user.sex))
		dispatch(setBalance(Number(response.body.balance)))
		dispatch(result())
		route.navigate('Main')
	} catch (e) {
		e.code = -1
		dispatch(error())
		dispatch(loaderState(false))
	}
}

const result = () => ({ type: RESULT })
const error = () => ({ type: ERROR })
const reset = () => ({ type: RESET })
