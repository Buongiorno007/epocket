import AsyncStorage from '@react-native-community/async-storage'
import { urls } from '../constants/urls'
export const RETURN_DATA = 'socket/RETURN_DATA'

const initialState = {
	status: 0,
	products: [],
	message: '',
	total: 0,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case RETURN_DATA:
			return Object.assign({}, { ...state, ...action.socket })
		default:
			return state
	}
}

export const getSocket = (orderId) => async (dispatch, getState) => {
	console.log('getSocket_START', orderId)
	const { token } = getState()
	let socket = new WebSocket(urls.socket)
	let msg = {
		orderId: orderId,
		token: token,
	}
	socket.onopen = (event) => {
		console.log('socket.onopen', event)
		socket.send(JSON.stringify(msg))
		dispatch(returnData())
	}
	socket.onclose = (event) => {
		console.log('socket.onclose', event)
		if (event.wasClean) {
		} else {
		}
		AsyncStorage.multiSet([['cashout_cart', ''], ['cashout_cart_time', ''], ['cashout_cart_id', '']], () => {})
	}

	socket.onmessage = (event) => {
		console.log('socket.onmessage', event)
		let response = JSON.parse(event.data).data
		console.log(response, 'SOCKET_R')
		switch (response.status) {
			case -1:
				response.products.forEach((item) => {
					item.approve = false
				})
				socket.close()
				break
			case 1:
				socket.close()
				break
			default:
				break
		}
		dispatch(returnData(response))
	}
	socket.onerror = (event) => {
		console.log('socket.onerror', event)
	}
}

export const returnData = (socket) => ({
	type: RETURN_DATA,
	socket,
})
