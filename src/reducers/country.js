import { COUNTRY } from './__proto__'
import { urls } from '@constants/urls'
import { httpGet } from '@services/http'
import { loaderState } from '@reducers/loader'
import { updateServerRequest } from '@reducers/serverRequest'

const initialState = new COUNTRY()

const RESULT = '[country]/RESULT'

export default (state = initialState, action) => {
	switch (action.type) {
		case RESULT:
			return action.payload
		default:
			return initialState
	}
}

export const list = () => async (dispatch, getState) => {
	const { country } = getState()
	if (country.length === 0) {
		dispatch(loaderState(true))
		try {
			await dispatch(loaderState(false))
			await dispatch(updateServerRequest(false))
			const response = await httpGet(urls.echo)
			await dispatch(result(new COUNTRY(response.body)))
		} catch (e) {
			country()
			dispatch(updateServerRequest(true))
			dispatch(result(new COUNTRY(e)))
		}
	}
}

const result = (payload) => ({ type: RESULT, payload })
