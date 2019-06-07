import { Platform } from 'react-native'
import { urls } from '@constants/urls'
import { PROFILE } from './__proto__'
import config from '@constants/config'
import { httpPost } from '@services/http'
import { loaderState } from '@reducers/loader'
import { setInstaToken } from '@reducers/insta-token'
import { setBalance } from '@reducers/user-balance'
import { setToken } from '@reducers/token'
import { getPush } from '@reducers/push'
import { current } from '@reducers/location'
import { toAge } from '@services/converteDate'
import AsyncStorage from '@react-native-community/async-storage'
import BackgroundGeolocationModule from '@services/background-geolocation-picker'
import I18n from '@locales/I18n'
import route from '@services/route'

const RESULT = '[user info] RESULT'

const initialState = new PROFILE()

export default (state = initialState, action) => {
	switch (action.type) {
		case RESULT:
			return action.user
		default:
			return state
	}
}

export const getUser = (token) => async (dispatch) => {
	geolocation()
	try {
		const response = await httpPost(urls.get_user, JSON.stringify({}), token)
		const user = {
			name: response.body.user_name,
			phone: response.body.user_phone,
			photo: response.body.photo,
			sex: response.body.sex ? 1 : 0,
			currency: I18n.locale === 'ru' ? response.body.currency_plural : response.body.currency,
			birthDay: toAge(response.body.birth_day),
		}
		await dispatch(saveUser(user))
		await dispatch(setToken(token))
		await dispatch(getPush(token))
		await dispatch(setInstaToken(response.body.is_insta_logged))
		await dispatch(setBalance(Number(response.body.balance)))
		await dispatch(current())
		await AsyncStorage.setItem('user_info', JSON.stringify(user))
		route.navigate('Main')
	} catch (error) {}
}

const geolocation = () => {
	if (Platform.OS === 'ios') {
		BackgroundGeolocationModule.ready(config(), (state) => {
			!state.enabled && BackgroundGeolocationModule.start(function() {})
		})
	} else {
		BackgroundGeolocationModule.configure(config())
		BackgroundGeolocationModule.checkStatus((status) => {
			!status.isRunning && BackgroundGeolocationModule.start()
		})
	}
}

export const saveUser = (user) => ({ type: RESULT, user })
