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

export const connect = () => async (dispatch, getState) => {
	NetInfo.isConnected.fetch().then((connected) => {
		dispatch(result(connected))
		NetInfo.isConnected.addEventListener('connectionChange', (state) => {
			const { connection } = getState()
			if (connection !== state) {
				dispatch(result(state))
			}
		})
		AppState.addEventListener('change', (change) => {
			const { connection } = getState()
			NetInfo.isConnected.addEventListener('connectionChange', (state) => {
				const { connection } = getState()
				if (connection !== state) {
					dispatch(result(state))
				}
			})
		})
	})
}

export const disconnect = () => async (dispatch) => {
	AppState.removeEventListener('change', () => {})
	NetInfo.removeEventListener('connectionChange', () => {})
}

export const result = (payload) => ({ type: CONNECT, payload })
export const reset = () => ({ type: DISCONNECT })
