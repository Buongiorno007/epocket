export const SET_COLOR = 'user-color/SET_COLOR'
import colors_men from '../constants/colors_men'
import colors_women from '../constants/colors_women'

export default (state = colors_women, action) => {
	switch (action.type) {
		case SET_COLOR:
			return action.color
		default:
			return state
	}
}

export const setColor = (sex) => {
	let color
	if (sex) {
		color = colors_men
	} else {
		color = colors_women
	}
	return {
		type: SET_COLOR,
		color,
	}
}
