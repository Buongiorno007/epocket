import { AppState } from 'react-native'
import NetInfo from '@react-native-community/netinfo'

const CONNECT = '[internet connection] CONNECT'
const DISCONNECT = '[internet connection] DISCONNECT'

const initialState = true

export default (state = initialState, action) => {
	switch (action.type) {
		case CONNECT:
			return action.payload
		case DISCONNECT:
			return Object.assign({}, { ...initialState })
		default:
			return state
	}
}

export const internet = () => async (dispatch) => {
	await dispatch(disconnect())
	await dispatch(connect())
}

export const connect = () => async (dispatch) => {
	NetInfo.isConnected.fetch().then((connection) => dispatch(result(connection)))
	NetInfo.isConnected.addEventListener('connectionChange', (connection) => dispatch(result(connection)))
	AppState.addEventListener('change', () => {
		NetInfo.isConnected.addEventListener('connectionChange', (connection) => dispatch(result(connection)))
	})
}

export const disconnect = () => async (dispatch) => {
	AppState.removeEventListener('change', () => {})
	NetInfo.removeEventListener('connectionChange', () => {})
}

export const result = (payload) => ({ type: CONNECT, payload })
export const reset = () => ({ type: DISCONNECT })
