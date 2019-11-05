import { urls } from '@constants/urls'
import { httpPost } from '@services/http'

const SET_VALUE = '[qrValue] SET_VALUE'
const CLEAR_VALUE = '[qrValue] CLEAR_VALUE'

const initialState = ''

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_VALUE:
			return action.value
		case CLEAR_VALUE:
			return initialState
		default:
			return state
	}
}

export const generateQr = (data) => async (dispatch, getState) => {
	const { token } = getState()
	let result = []
	data.forEach((item) => result.push({ id: item.unique_id, count: item.product_amount }))
	const body = {
		items: result,
		pay: true,
	}
	try {
		let response = await httpPost(urls.basket_update, JSON.stringify(body), token)
		console.log('QR_RESPONSE', response)
		dispatch(setQrValue(response.body.link))
	} catch (e) {
		console.log(e, 'generateQr ERROR')
	}
}

export const setQrValue = (value) => ({ type: SET_VALUE, value })
export const clearQrValue = () => ({ type: CLEAR_VALUE })
