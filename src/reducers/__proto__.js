export const DEFAULT = function(data = {}) {
	this.code = data.code || null
	this.message = data.message || null
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

export const GAME_RESULT = function(data = {}) {
	this.game_id = data.game_id || 0
	this.ticker = data.ticker || ''
	this.award = data.award || ''
	this.insta_img = data.insta_img || ''
	this.video = data.video || ''
	this.link = data.game_link || data.brand_link || ''
	this.timer = data.timer || 20
	// this.timer = 5
}
export const GAME_TICKER = function(data = {}) {
	this.partners = data.brand_partners || data.base_partners || []
	this.timer = data.base_time || 0
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

export const BONUSES = function(data = {}) {
	DEFAULT.apply(this, arguments)
	this.currency = data.currency || 'UAH'
	this.phone = data.phone || ''
	this.max = Number(data.refill) || 0
	this.min = Number(data.min_refill) || 0
	this.tax = Number(data.tax_amount) || 0
	this.value = Number(data.received_bonuses) || 0
}
BONUSES.prototype = Object.create(DEFAULT.prototype)

export const WALLET = function(data = {}) {
	this.balance = data.balance || 0
	this.history = data.data || []
}
export const MAPPOINTS = function(data = {}) {
	this.outlets = data.outlets || []
	this.cashouts = data.cashouts || []
	this.filters = data.filters || []
	this.oldFilters = data.filters || []
	this.request = data.request || false
}
export const MISSIONSTATE = function(data = {}) {
	this.inRadius = data.inRadius || false
	this.title = data.title || ''
	this.timer = data.timer || 0
	this.failTimer = data.failTimer || 0
	this.missionId = data.missionId || 0
	this.outletId = data.outletId || 0
	this.process = data.process || false
}

export const PARTNERS = function(data = []) {
	this.online = data
}
