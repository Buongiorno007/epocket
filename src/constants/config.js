import { Platform } from 'react-native'
import BackgroundGeolocationModule from '@services/background-geolocation-picker'

const android = {
	desiredAccuracy: 0,
	distanceFilter: 1,
	desiredOdometerAccuracy: 1,
	stopTimeout: 5,
	debug: false,
	logLevel: BackgroundGeolocationModule.LOG_LEVEL_VERBOSE,
	stopOnTerminate: false,
	startOnBoot: false,
	stationaryRadius: 1,
	locationProvider: BackgroundGeolocationModule.ACTIVITY_PROVIDER,
	interval: 15000,
	fastestInterval: 1200,
	activitiesInterval: 10000,
	stopOnStillActivity: false,
}

const ios = {
	desiredAccuracy: BackgroundGeolocationModule.DESIRED_ACCURACY_HIGH,
	distanceFilter: 10,
	stopTimeout: 1,
	debug: false,
	logLevel: BackgroundGeolocationModule.LOG_LEVEL_VERBOSE,
	stopOnTerminate: false,
	startOnBoot: false,
	stationaryRadius: 1,
}

const defaulted = {
	desiredAccuracy: 0,
	distanceFilter: 1,
	desiredOdometerAccuracy: 10,
	stopTimeout: 5,
	debug: false,
	logLevel: BackgroundGeolocationModule.LOG_LEVEL_VERBOSE,
	stopOnTerminate: false,
	startOnBoot: true,
}

const config = () => {
	if (Platform.OS === 'ios') {
		return ios
	} else if (Platform.OS === 'android') {
		return android
	}
	return defaulted
}

export default config
