import { LOCATION } from './__proto__'
import { Platform } from 'react-native'
import BackgroundGeolocationModule from '@services/background-geolocation-picker'

const COORDINATE = '[location] COORDINATE'
const STATUS = '[location] STATUS'

const initialState = new LOCATION()

export default (state = initialState, action) => {
	switch (action.type) {
		case COORDINATE:
			return Object.assign({ ...state, coordinate: { lng: action.payload.lng, lat: action.payload.lat } })
		case STATUS:
			return Object.assign({ ...state, status: action.payload })
		default:
			return state
	}
}

export const coordinate = () => async (dispatch) => {
	BackgroundGeolocationModule.on('location', (location) => {
		if (Platform.OS === 'ios') {
			const response = {
				lng: Number(location.coords.longitude),
				lat: Number(location.coords.latitude),
			}
			dispatch(setCoordinate(response))
		} else {
			if (location.lng) {
				dispatch(setCoordinate(location))
			} else {
				const response = {
					lat: location.latitude || 0,
					lng: location.longitude || 0,
				}
				dispatch(setCoordinate(response))
			}
		}
		dispatch(setStatus(true))
	})
}

export const current = () => async (dispatch) => {
	navigator.geolocation.getCurrentPosition(
		(position) => {
			const response = {
				lng: Number(position.coords.longitude),
				lat: Number(position.coords.latitude),
			}
			dispatch(setCoordinate(response))
			dispatch(setStatus(true))
		},
		(error) => {
			dispatch(setStatus(false))
		},
	)
}

export const status = () => async (dispatch) => {
	if (Platform.OS === 'ios') {
		BackgroundGeolocationModule.on('providerchange', (location) => dispatch(setStatus(location.enabled)))
	} else {
		BackgroundGeolocationModule.on('authorization', (authorization) => {
			BackgroundGeolocationModule.checkStatus((status) => {
				dispatch(setStatus(status.isRunning && status.hasPermissions))
			})
		})
	}
}

const setCoordinate = (payload) => ({ type: COORDINATE, payload })
const setStatus = (payload) => ({ type: STATUS, payload })
