import React from 'react'
import { Platform, AppState } from 'react-native'
import { findNearest, getDistance } from 'geolib'
import BackgroundFetch from 'react-native-background-fetch'
import BackgroundTimer from 'react-native-background-timer'
import { httpPost } from './http'
//services
import getCurrentGeolocation from './get-location'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { showDashboard } from '../reducers/show-dashboard'
import { setDistance } from '../reducers/distance'
import { setAppState } from '../reducers/app-state'
import { setMainTaskId } from '../reducers/main-task-id'
import { setSheduleRequestStart } from '../reducers/set-shedule-request-start'
import { showDoneNotification } from '../reducers/main-task-done-notification'
import { showTimer } from '../reducers/show-dashboard-timer'
import { setPushStatus } from '../reducers/push-send-status'
//constants
import { urls } from '../constants/urls'
import firebase from 'react-native-firebase'
import I18n from '@locales/I18n'
import { sendToTelegramm } from '../services/telegramm-notification'

class GeolocationService extends React.Component {
	state = {
		sheduleRequest: null,
		appState: AppState.currentState,
	}

	startMissionRequest = () => {
		let body = {
			outlet_id: this.props.selectedMall.id,
		}
		httpPost(urls.start_mission, JSON.stringify(body), this.props.token).then(
			(result) => {
				if (result.body.interval <= 0) {
					this.finishMainTask()
				}
				if (result.body.failed) {
					this.rejectMainTask()
				}
				this.props.setMainTaskId(result.body.id)
			},
			(error) => {},
		)
	}

	sendTimerRequest = () => {
		let interval = 900000
		BackgroundFetch.configure(
			{
				minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
			},
			() => {
				this.startMissionRequest()
			},
			(error) => {},
		)
		BackgroundTimer.runBackgroundTimer(() => {
			this.startMissionRequest()
		}, interval)
		//rest of code will be performing for iOS on background too
	}

	finishMainTask() {
		let body = {
			outlet_id: this.props.selectedMall.id,
			mission_id: this.props.mainTaskId,
		}
		httpPost(urls.finish_mission, JSON.stringify(body), this.props.token).then(
			(result) => {
				if (body.status === 200) {
					this.props.timerStatus(false)
					this.props.showDoneNotification(true)
					this.props.setBalance(result.balance)
				}
			},
			(error) => {},
		)
	}

	sendDistancePush = (message) => {
		console.log(message, 'sendDistancePush')
		// firebase.notifications().onNotification(async (notification) => {
		// 	const newNotification = new firebase.notifications.Notification()
		// 	  .setNotificationId(new Date().getTime().toString())
		// 	  .setTitle('EpocketCash')
		// 	  .setBody(message)
		// 	// {
		// 	//   Platform.OS == 'android' &&
		// 	// 	notification
		// 	// 	  .android.setChannelId('####')
		// 	// }
		// 	await firebase.notifications().displayNotification(newNotification).catch((err) => {
		// 	  console.log('err---****', err);
		// 	});
		//   });
		try {
			// Build a channel
			const channel = new firebase.notifications.Android.Channel(
				'test-channel',
				'Test Channel',
				firebase.notifications.Android.Importance.Max,
			).setDescription('My apps test channel')

			// Create the channel
			firebase.notifications().android.createChannel(channel)

			// Create notification
			const notification = new firebase.notifications.Notification()
				.setNotificationId('notificationId')
				.setTitle('EpocketCash')
				.setBody(message)

			notification.android
				.setChannelId('Miscellaneous')
				// .android.setColor(this.props.userColor.pink)
				.android.setSmallIcon('@drawable/ic_notif')

			console.log(notification, 'sendDistancePush notification')
			
			firebase.notifications().displayNotification(notification)
		} catch (error) {
			console.log(error, 'sendDistancePush ERR')
			// sendToTelegramm('this.sendDistancePush', error)
		}
	}

	// _handleAppStateChange = (nextAppState) => {
	// 	if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
	// 		getCurrentGeolocation().then(
	// 			(location) => {
	// 				console.log(location, 'GEOLOCATION-SERVICE')
	// 				this.calculateDistance()
	// 			},
	// 			(error) => {},
	// 		)
	// 	}
	// 	this.setState({appState: nextAppState});
	// }

	// componentDidMount() {
	// 	AppState.addEventListener('change', this._handleAppStateChange)
	// }
	// componentWillUnmount() {
	// 	AppState.removeEventListener('change', this._handleAppStateChange)
	// }
	closeMission = () => {
		this.props.showFailedNotification(true)
		BackgroundTimer.stopBackgroundTimer()
	}

	calculateDistance = () => {
		const { location, mapPoints } = this.props
		const region = {
			latitude: location.lat,
			longitude: location.lng,
			latitudeDelta: 0.006,
			longitudeDelta: 0.006,
		}
		// if (currentLocation.latitude !== 0 && currentLocation.longitude !== 0 && nextLocation.latitude !== 0 && nextLocation.longitude !== 0) {
		// console.log(currentLocation, 'CURRENT LOCATION')

		let nearestMall = findNearest(region, mapPoints.outlets)
		let distance = getDistance(region, nearestMall) - nearestMall.rad

		console.log(distance, 'CURRENT LOCATION DISTANCE')
		// let distance =
		// 	getDistance(
		// 		{
		// 			latitude: currentLocation.latitude,
		// 			longitude: currentLocation.longitude,
		// 		},
		// 		{
		// 			latitude: nextLocation.latitude,
		// 			longitude: nextLocation.longitude,
		// 		},
		// 	) - this.props.closestMall.rad
		// if (nextProps.isLocation && this.props.isLocation) {
		// if (distance > 100) {
		// 	this.props.setPushStatus(true)
		// }
		// if (distance <= 100 && !nextProps.pushSendStaus) {
		// if (distance <= 100 ) {
		// 	this.sendDistancePush(I18n.t('PUSH_MESSAGE.PUSH_3'))
		// 	this.props.setPushStatus(true)
		// }
		// if (distance <= 0 && !this.props.timer_status && nextProps.timer_status) {
		if (distance <= 0) {
			// this.props.showDashboard(true)
			// this.props.showTimer(false)
			this.sendDistancePush(I18n.t('PUSH_MESSAGE.PUSH_4'))
		}
		// if (distance > 0 && this.props.timer_status) {
		if (distance > 0) {
			// this.props.showDashboard(false)
			// this.props.showTimer(true)
			this.sendDistancePush(I18n.t('PUSH_MESSAGE.PUSH_5'))
		}
		// }
		// }
	}

	// componentWillReceiveProps = (nextProps) => {
	// 	if (
	// 		(this.props.selectedMall.lat &&
	// 			this.props.selectedMall.lng &&
	// 			nextProps.location.lat.toFixed(4) !== this.props.location.lat.toFixed(4) &&
	// 			nextProps.location.lng.toFixed(4) !== this.props.location.lng.toFixed(4)) ||
	// 		(this.props.selectedMall.lat &&
	// 			this.props.selectedMall.lng &&
	// 			!this.state.sendDistancePush &&
	// 			nextProps.location.lat.toFixed(4) === this.props.location.lat.toFixed(4) &&
	// 			nextProps.location.lng.toFixed(4) === this.props.location.lng.toFixed(4))
	// 	) {
	// 		this.calculateDistance(
	// 			{
	// 				latitude: this.props.closestMall.lat,
	// 				longitude: this.props.closestMall.lng,
	// 			},
	// 			{
	// 				latitude: nextProps.location.lat,
	// 				longitude: nextProps.location.lng,
	// 			},
	// 			nextProps,
	// 		)
	// 	}
	// 	if (nextProps.timer_status && !nextProps.sheduleRequestStart) {
	// 		this.props.setSheduleRequestStart(true)
	// 		this.sendTimerRequest()
	// 	}
	// 	if (!nextProps.timer_status && nextProps.sheduleRequestStart) {
	// 		this.props.setSheduleRequestStart(false)
	// 		BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA)
	// 		BackgroundTimer.stopBackgroundTimer()
	// 	}
	// 	if (!nextProps.isLocation && !this.props.isLocation) {
	// 		this.props.showDashboard(false)
	// 	}
	// }

	render() {
		getCurrentGeolocation().then(
			(location) => {
				console.log(location, 'GEOLOCATION-SERVICE')
				this.calculateDistance()
			},
			(error) => {},
		)
		return null
	}
}

const mapStateToProps = (state) => {
	return {
		isLocation: state.location.status,
		userColor: state.userColor,
		location: state.location.coordinate,
		selectedMall: state.selectedMall,
		timer_status: state.timer_status,
		distance: state.distance,
		token: state.token,
		dashboard: state.dashboard,
		sheduleRequestStart: state.sheduleRequestStart,
		appState: state.appState,
		mainTaskId: state.mainTaskId,
		pushSendStaus: state.pushSendStaus,
		closestMall: state.closestMall,
		mapPoints: state.mapPoints,
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			showDashboard,
			setDistance,
			showDoneNotification,
			setSheduleRequestStart,
			setAppState,
			setMainTaskId,
			showTimer,
			setPushStatus,
		},
		dispatch,
	)

export default connect(mapStateToProps, mapDispatchToProps)(GeolocationService)
