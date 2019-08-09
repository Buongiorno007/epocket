import { httpPost } from '@services/http'
import { urls } from '@constants/urls'
import { PARTNERS } from './__proto__'

const SET_PARTNERS = '[partners] SET_PARTNERS'
const initialState = new PARTNERS()

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PARTNERS:
			return action.partners
		default:
			return state
	}
}

export const getPartners = () => async (dispatch, getState) => {
	const { lat, lng } = getState().location.coordinate
	const { token } = getState()
	console.log('HELLO')
	let body = JSON.stringify({
		latt: lat,
		long: lng,
	})
	try {
		const response = await httpPost(urls.get_partners, body, token)
		const result = response.body.filter((item) => item.online === true)
		dispatch(setPartners(new PARTNERS(result)))
	} catch (e) {
		console.log(e, 'EEE')
	}
}

export const setPartners = (partners) => ({ type: SET_PARTNERS, partners })
