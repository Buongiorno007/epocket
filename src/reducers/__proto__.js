export const COUNTRY = function(data = {}) {
	this.list = data.c_list || []
	this.sms = data.sms_active || false
}

export const LOCATION = function(data = {}) {
	this.coordinate = data.coordinate || { lng: 0, lat: 0 }
	this.permission = data.permission || false
}

export const PROFILE = function(data = {}) {
	this.name = data.name || ''
	this.phone = data.phone || ''
	this.photo = data.photo || ''
	this.sex = data.sex || null
	this.birthDay = data.birthDay || ''
	this.currency = data.currency || ''
}
