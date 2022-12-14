import { Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'react-native-firebase'
import { sendToTelegramm } from '../services/telegramm-notification'
import { urls } from '../constants/urls'
import Permissions from 'react-native-permissions'
import { httpPost } from '../services/http'

export default (state = false, action) => {
	switch (action.type) {
		default:
			return state
	}
}

sendFiredaseToken = (app_token, firebase_token) => {
	let body = {
		token: firebase_token,
		platform: Platform.OS === 'ios' ? 2 : 1,
	}
	try {
		httpPost(urls.add_device, JSON.stringify(body), app_token).then(
			(result) => {
				console.log('push success', result)
			},
			(error) => {},
		)
	} catch (err) {
		console.log('push err', err)
		sendToTelegramm('CHECK FIREBASE')
	}
}

export const getPush = (app_token) => async (dispatch) => {
	firebase
		.messaging()
		.getToken()
		.then((firebase_token) => {
			this.sendFiredaseToken(app_token, firebase_token)
			AsyncStorage.setItem('fire_token', firebase_token)
		})
	firebase
		.messaging()
		.hasPermission()
		.then((enabled) => {
			if (!enabled) {
				Permissions.request('notification').then((response) => {})
			}
		})
}
