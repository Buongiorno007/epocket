export const SET_GEO_VIRGIN = 'geo-virgin/SET_GEO_VIRGIN'

export default (state = false, action) => {
	switch (action.type) {
		case SET_GEO_VIRGIN:
			return action.status
		default:
			return state
	}
}

export const setGeoVirgin = (status) => {
	return {
		type: SET_GEO_VIRGIN,
		status,
	}
}
