import { BASKET, STOREPOINT } from './__proto__'
//constants
import { urls } from '@constants/urls'
//services
import { httpPost, httpGet, httpDel } from '@services/http'
//reducers
import { setPoint } from './storePoint'
const SET_BASKET = '[basket] SET_BASKET'

const initialState = new BASKET()

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_BASKET:
			return action.basket
		default:
			return state
	}
}

export const getBasket = () => async (dispatch, getState) => {
	const { token } = getState()
	try {
		const response = await httpGet(urls.basket_update, token)
		console.log('BASKET_RESP', response)
		dispatch(setBasket(new BASKET(response.body)))
	} catch (e) {
		console.log(e, 'ERROR getBasket')
	}
}

export const addToBasket = (id, action) => async (dispatch, getState) => {
	const { token } = getState()
	const body = {
		product_unique_id: id,
		action: action,
		amount: action ? 1 : 9999,
	}
	const storeBody = {
		cashout_id: Number(id.split('_')[0]),
	}
	try {
		const basketResponse = await httpPost(urls.basket_update, JSON.stringify(body), token)
		const storeResponse = await httpPost(urls.new_poducts, JSON.stringify(storeBody), token)
		await dispatch(setBasket(new BASKET(basketResponse.body)))
		await dispatch(setPoint(new STOREPOINT(storeResponse.body.cash_out_point)))
	} catch (e) {
		console.log(e, 'EEEE addToBasket')
	}
}
export const removeFromBasket = (id) => async (dispatch, getState) => {
	const { token } = getState()
	const body = {
		point_id: id
	}	
	try {
		const basketRemoveResponse = await httpDel(urls.basket_update, JSON.stringify(body), token)	
		console.log(basketRemoveResponse, 'basketRemoveResponse')	
		await dispatch(getBasket())
	} catch (e) {
		console.log(e, 'EEEE removeFromBasket')
	}
}

export const setBasket = (basket) => ({ type: SET_BASKET, basket })
