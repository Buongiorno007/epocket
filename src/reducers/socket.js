import { urls } from "../constants/urls";
import { AsyncStorage } from 'react-native'
export const RETURN_DATA = 'socket/RETURN_DATA';

const initialState = {
	status: 0,
	products: [],
	message: "",
	total: 0,
};

export default (state = initialState, action) => {

	switch (action.type) {
		case RETURN_DATA:
			return Object.assign({}, { ...state, ...action.socket });
		// return action.socket;
		default:
			return state;
	}
}

export const getSocket = (token, orderId) => async dispatch => {
	console.log('getSocket', orderId)
	let socket = new WebSocket(urls.socket);
	let msg = {
		orderId: orderId,
		token: token
	};
	socket.onopen = (event) => {
		console.log('onopen Connection ready!', event);
		socket.send(JSON.stringify(msg));
		dispatch(returnData());

	};
	socket.onclose = (event) => {
		if (event.wasClean) {
			console.log('Соединение закрыто чисто');
		} else {
			console.log('Обрыв соединения'); // например, "убит" процесс сервера
		}
		console.log('Код: ' + event.code + ' причина: ' + event.reason);
	};
	socket.onmessage = (event) => {
		let response = JSON.parse(event.data).data
		console.log('onmessage event', response)
		switch (response.status) {
			case -1:
				response.products.forEach((item) => {
					item.approve = false;
				});
				socket.close()
				break;
			case 1:
				socket.close()
				break;
			default:
				break;
		}
		dispatch(returnData(response));
	};
	socket.onerror = (event) => {
		console.log('onerror', event);
	};
}

export const returnData = (socket) => ({
	type: RETURN_DATA, socket
});