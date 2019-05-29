export const BIRTHDAY_CHANGE = 'birthday/BIRTHDAY_CHANGE'

export default (state = '', action) => {
	switch (action.type) {
		case BIRTHDAY_CHANGE:
			return action.stringDate
		default:
			return state
	}
}

export const setBirthDay = (date) => {
	let stringDate
	if (date.day && date.month && date.year) {
		let stringDay = String(date.day)
		let stringMonth = String(date.month)
		let stringYear = String(date.year)
		if (stringDay.length < 2) {
			stringDay = '0' + stringDay
		}
		if (stringMonth.length < 2) {
			stringMonth = '0' + stringMonth
		}
		stringDate = stringDay + '.' + stringMonth + '.' + stringYear
	} else {
		stringDate = date
	}
	return {
		type: BIRTHDAY_CHANGE,
		stringDate,
	}
}
