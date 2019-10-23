import { IMAGE } from './__proto__'

const SET_IMAGE = '[image] SET_IMAGE'

const initialState = new IMAGE()

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_IMAGE:
			return action.data
		default:
			return state
	}
}



export const setImage = (data) => ({ type: SET_IMAGE, data })
