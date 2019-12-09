import { STOREPOINT } from './__proto__'
import { urls } from '@constants/urls'
import { httpPost } from '@services/http'
import route from '@services/route'
import { triggerInfoSpSet } from "@reducers/map-spend-trigger-infobox"
import { loaderState } from '@reducers/loader'

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
	// if (storePoint.id !== id) {
		body = {
			cashout_id: id,
		}
		try {
			const response = await httpPost(urls.new_poducts, JSON.stringify(body), token)
			await dispatch(setPoint(new STOREPOINT(response.body.cash_out_point)))
			await dispatch(triggerInfoSpSet(true))
			// await route.push('StorePoint')
		} catch (e) {
			console.log(e, 'getStorePoint EEEEEEEE')
		}
	// } else {
		// route.push('StorePoint')
	// }
}

export const getStorePoint2 = (id) => async (dispatch, getState) => {
	dispatch(loaderState(true))
	const { token } = getState()
		body = {
			cashout_id: id,
		}
		try {
			const response = await httpPost(urls.new_poducts, JSON.stringify(body), token)
			await dispatch(setPoint(new STOREPOINT(response.body.cash_out_point)))
			await dispatch(loaderState(false))
			await route.push('StorePoint')
		} catch (e) {
			console.log(e, 'getStorePoint2 EEEEEEEE')
			dispatch(loaderState(false))
		}
}

export const setPoint = (point) => ({ type: SET_POINT, point })
