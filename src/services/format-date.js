export function formatDate(value) {
	const d = new Date(value)
	const status = d instanceof Date && !isNaN(d)
	const date = status ? d : new Date()
	return date
		.toLocaleString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
		.replace(/,/gi, '  ')
}
