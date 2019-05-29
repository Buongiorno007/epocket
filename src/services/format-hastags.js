export function formatItem(item) {
	item = item.trim()
	item = '#' + item
	item = item.replace(/\ /g, '')
	item = item.replace(/\,/g, ' #')
	item.indexOf('#') === -1 && (item = '#' + item)
	return item
}
