import { AUTH } from './__proto__'
import { urls } from '@constants/urls'
import { loaderState } from '@reducers/loader'
import { resetSignIn } from '@reducers/sign-in'
import { httpPost } from '@services/http'
import I18n from '@locales/I18n'
import route from '@services/route'

const RESULT = '[sign-up] RESULT'
const ERROR = '[sign-up] ERROR'
const RESET = '[sign-up] RESET'

const initialState = new AUTH()

export default (state = initialState, action) => {
	switch (action.type) {
		case RESULT:
			return Object.assign(
				{},
				{
					...state,
					code: 1,
					phone: action.payload.phone,
					name: action.payload.name,
					gender: action.payload.gender,
					age: action.payload.age,
					user_id: action.payload.user_id,
					back: action.payload.back,
					title: action.payload.title,
				},
			)
		case ERROR:
			return Object.assign(
				{},
				{
					...state,
					code: -1,
					phone: action.error.phone,
					name: action.error.name,
					gender: action.error.gender,
					age: action.error.age,
					user_id: action.error.user_id,
					back: action.error.back,
					title: action.error.title,
				},
			)
		case RESET:
			return Object.assign({}, { ...initialState })
		default:
			return state
	}
}

// export const signUp = (number, name, gender, age, user_id = '') => async (dispatch) => {
export const signUp = (number, name, user_id = '') => async (dispatch) => {
	dispatch(resetSignIn())
	dispatch(resetSignUp())
	dispatch(loaderState(true))
	try {
		const body = JSON.stringify({ phone: number })
		const response = await httpPost(urls.sign_up, body)
		console.log(response, 'SIGN_UP RESP')
		response.phone = number
		response.name = name
		// response.gender = gender
		// response.age = age
		response.user_id = user_id
		response.back = 'SignUp'
		response.title = I18n.t('SIGN_UP_TITLE')
		dispatch(result(new AUTH(response)))
		dispatch(loaderState(false))
		route.navigate('ConfirmCode')
	} catch (e) {
		console.log(e, 'SIGN_UP RESP ERR')
		e.code = -1
		e.code = -1
		e.back = 'SignUp'
		e.title = I18n.t('SIGN_UP_TITLE')
		dispatch(error(new AUTH(e)))
		dispatch(loaderState(false))
	}
}

export const result = (payload) => ({ type: RESULT, payload })
export const error = (error) => ({ type: ERROR, error })
export const resetSignUp = () => ({ type: RESET })
