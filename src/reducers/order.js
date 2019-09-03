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

export const setOrder = (order) => ({ type: SET_ORDER, order })
