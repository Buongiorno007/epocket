export const DEFAULT = function(data: any = {}) {
	this.code = data.code || null
}

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

export const GAME_START = function(data = {}) {
	this.id = data.id || 0
	this.games_count = `${data.games_count}` || ''
	this.available_game_len = `${data.available_game_len}` || ''
	this.award = `${data.award}` || ''
}

export const GAME_PROCESS = function(data = {}) {
	this.id = data.id || 0
	this.title = data.title || ''
	this.descr = data.descr || ''
	this.image = data.image || ''
	this.amount = `${data.amount}` || ''
	this.brand = data.brand || ''
	this.time = Number(data.time) || 0
}

export const AUTH = function(data = {}) {
	DEFAULT.apply(this, arguments)
	this.phone = data.phone || null
	this.gender = data.gender || null
	this.name = data.name || null
	this.age = data.age || null
	this.user_id = data.user_id || null
	this.back = data.back || 'Start'
	this.title = data.title || ''
}
AUTH.prototype = Object.create(DEFAULT.prototype)
