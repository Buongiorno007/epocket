import moment from 'moment'

export const toAge = (date) => {
	return moment().diff(moment(date, 'DDMMYYYY'), 'years')
}

export const ageToDate = (age) => {
	const timeStamp = new Date().getTime() - age * 31557600000
	return moment(new Date(timeStamp)).format('DD.MM.YYYY')
}
