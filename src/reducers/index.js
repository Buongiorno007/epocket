import { combineReducers } from 'redux'

export default combineReducers({
	appState: require('./app-state').default, //COULD BE DEPRECATED
	bonuses: require('./bonuses').default,
	closestMall: require('./closestMall').default, //COULD BE DEPRECATED
	connection: require('./connection').default,
	country: require('./country').default,
	dashboardState: require('./dashboard-state').default,
	distance: require('./distance').default,
	facebook_token: require('./facebook-token').default,
	game_status: require('./game-status').default,
	gameProcess: require('./gameProcess').default,
	gameResult: require('./gameResult').default,
	gameStart: require('./gameStart').default,
	gameTicker: require('./gameTicker').default,
	geolocationIsVirgin: require('./geo-virgin').default,
	//HISTORY BONUSES to services
	receivedBonusesJSX: require('./history-received-success').default,
	spentBonusesJSX: require('./history-sent-success').default,
	initial_outlets: require('./initial-outlets').default,
	insta_token: require('./insta-token').default,
	loader: require('./loader').default,
	location: require('./location').default,
	doneMissionCost: require('./main-task-cost').default,
	doneNotification: require('./main-task-done-notification').default,
	failedNotification: require('./main-task-failed-notification').default,
	mainTaskId: require('./main-task-id').default,
	missions: require('./missions').default,
	navigateToMall: require('./navigate-to-mall').default,
	outlets: require('./outlet-list').default,
	//POST STATUS to services
	profileState: require('./profile-state').default,
	pushSendStaus: require('./push-send-status').default,
	//PUSH to services
	refill: require('./refill').default,
	scanner: require('./scanner').default,
	selectedMall: require('./selected-mall').default,
	selectedMission: require('./selected-mission').default,
	send_code: require('./send-code').default,
	serverRequest: require('./serverRequest').default,
	activeCard: require('./set-active-card').default,
	sheduleRequestStart: require('./set-shedule-request-start').default,
	showQR: require('./set-show-qr').default,
	timerShow: require('./show-dashboard-timer').default,
	dashboard: require('./show-dashboard').default,
	sign_in_confirm: require('./sign-in-confirm').default,
	sign_in: require('./sign-in').default,
	sign_up_confirm: require('./sign-up-confirm').default,
	sign_up: require('./sign-up').default,
	socialCount: require('./social-count').default,
	socket: require('./socket').default,
	sounds: require('./sounds').default,
	activeTab: require('./tabs').default,
	timer_interval: require('./timer-interval').default,
	timer_status: require('./timer-status').default,
	timer: require('./timer').default,
	token: require('./token').default,
	balance: require('./user-balance').default,
	userColor: require('./user-color').default,
})
