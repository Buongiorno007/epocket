import { COUNTRY } from './__proto__'
import { urls } from '@constants/urls'
import { httpGet } from '@services/http'
import { loaderState } from '@reducers/loader'
import { updateServerRequest } from '@reducers/serverRequest'

const initialState = new COUNTRY()

const RESULT = '[country] RESULT'

export default (state = initialState, action) => {
	switch (action.type) {
		case RESULT:
			return action.payload
		default:
			return state
	}
}

export const list = () => async (dispatch, getState) => {
	const catalog = getState().country.list
	if (catalog.length === 0) {
		try {
			const response = await httpGet(urls.echo)
			dispatch(result(new COUNTRY(response.body)))
			dispatch(loaderState(false))
		} catch (e) {
			list()
		}
	}
}

const result = (payload) => ({ type: RESULT, payload })
