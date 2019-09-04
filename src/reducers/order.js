import { ORDER } from './__proto__'
import route from '@services/route'

const SET_ORDER = '[order] SET_ORDER'
const initialState = new ORDER()

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_ORDER:
			return action.order
		default:
			return state
	}
}

export const saveOrder = (order) => async (dispatch) => {
	await dispatch(setOrder(new ORDER(order)))
	route.push('OrderScreen')
}

export const basketRoute = (id) => async (dispatch, getState) => {
	const { basket } = getState()
	const order = basket.data.filter((item) => item.point_id === id)
	if (order.length) {
		await dispatch(setOrder(new ORDER(...order)))
		route.push('OrderScreen')
	} else {
		route.push('BasketComponent')
	}
}

export const setOrder = (order) => ({ type: SET_ORDER, order })
