import { STOREPOINT } from './__proto__'
import { urls } from '@constants/urls'
import { httpPost } from '@services/http'
import route from '@services/route'

const SET_POINT = '[storePoint] SET_POINT'

const initialState = new STOREPOINT()

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_POINT:
			return action.point
		default:
			return state
	}
}

export const getStorePoint = (id) => async (dispatch, getState) => {
	const { token } = getState()
	const { storePoint } = getState()
	console.log(storePoint, 'STORE POINT')
	body = {
		cashout_id: id,
	}
	try {
		const response = await httpPost(urls.new_poducts, JSON.stringify(body), token)
		await dispatch(setPoint(new STOREPOINT(response.body.cash_out_point)))
		await route.push('StorePoint')
	} catch (e) {
		console.log(e, 'getStorePoint EEEEEEEE')
	}
}

export const setPoint = (point) => ({ type: SET_POINT, point })
