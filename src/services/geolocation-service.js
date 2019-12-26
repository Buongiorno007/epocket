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
		try {
			// Set up your listener
			firebase.notifications().onNotificationOpened((notificationOpen) => {
				// notificationOpen.action will equal 'snooze'
			})

			// Build your notification
			const notification = new firebase.notifications.Notification()
				.setTitle('Warning')
				.setBody(message)
				.setNotificationId('notification-action')
				.setSound('default')

			if (Platform.OS === 'android') {
				// Build a channel
				const channel = new firebase.notifications.Android.Channel(
					'test-channel',
					'Test Channel',
					firebase.notifications.Android.Importance.Max,
				).setDescription('My apps test channel')

				// Create the channel
				firebase.notifications().android.createChannel(channel)

				// Build an action
				const action = new firebase.notifications.Android.Action('snooze', 'ic_launcher', 'To EpocketCash')
				// This is the important line
				action.setShowUserInterface(false)

				notification.android.setChannelId('test-channel')
				notification.android.setPriority(firebase.notifications.Android.Priority.Max)

				// Add the action to the notification
				notification.android.addAction(action)
			} else {
				notification.ios.setBadge(12)
				notification.setData({})
				const _manageNotificationPermissions = async () => {
					const enabled = await firebase.messaging().hasPermission()
					if (enabled) {
						return true
					} else {
						try {
							await firebase.messaging().registerForRemoteNotifications()
							// await firebase.messaging().requestPermission();
							const notificationToken = await messaging().getToken()
							return true
						} catch (error) {
							return false
						}
					}
					return false
				}
			}

			// Display the notification
			firebase.notifications().displayNotification(notification)
		} catch (error) {
			console.log(error, 'sendDistancePush ERR')
			// sendToTelegramm('this.sendDistancePush', error)
		}
	}

	_handleAppStateChange = (nextAppState) => {
		console.log(nextAppState, 'nextAppState')
		this.setState({ appState: nextAppState })
	}

	componentDidMount() {
		AppState.addEventListener('change', this._handleAppStateChange)
	}
	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange)
	}

	closeMission = () => {
		this.props.showFailedNotification(true)
		BackgroundTimer.stopBackgroundTimer()
	}

	calculateDistance = () => {
		const { location, mapPoints, missionState } = this.props
		console.log(location.lat, location.lng, 'UNDEFINED ?')
		const region = {
			latitude: location.lat,
			longitude: location.lng,
			latitudeDelta: 0.006,
			longitudeDelta: 0.006,
		}

		let nearestMall = findNearest(region, mapPoints.outlets)
		let distance = getDistance(region, nearestMall) - nearestMall.rad

		console.log(distance, 'CURRENT LOCATION DISTANCE')

		if (distance > 0 && distance <= 100) {
			this.sendDistancePush(I18n.t('PUSH_MESSAGE.PUSH_3'))
			// this.props.setPushStatus(true)
		}
		if (distance <= 0) {
			this.sendDistancePush(I18n.t('PUSH_MESSAGE.PUSH_4'))
		}
		// if (distance > 0 && missionState.inRadius) {
		// 	this.sendDistancePush(I18n.t('PUSH_MESSAGE.PUSH_5'))
		// }
		if (distance > 0) {
			this.sendDistancePush(I18n.t('PUSH_MESSAGE.PUSH_5'))
		}
	}

	componentDidUpdate() {
		console.log('UPDATED---*****')
		console.log(this.props.location, 'this.props.location---*****')
		if (this.state.appState === 'background') {
			this.calculateDistance()
		}
	}

	render() {
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
		missionState: state.missionState,
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
