import { Platform } from 'react-native'
import BackgroundGeolocationModule from "../../../services/background-geolocation-picker"

export default function geo_config() {
    let config = undefined;

    switch (Platform.OS) {
        case 'android': {
            config = {
                desiredAccuracy: 0,
                distanceFilter: 1,
                desiredOdometerAccuracy: 1,
                // Activity Recognition
                stopTimeout: 5,
                // Application config
                debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
                logLevel: BackgroundGeolocationModule.LOG_LEVEL_VERBOSE,
                stopOnTerminate: true,   // <-- Allow the background-service to continue tracking when user closes the app.
                startOnBoot: true,        // <-- Auto start tracking when device is powered-up.

                stationaryRadius: 5,
                locationProvider: BackgroundGeolocationModule.ACTIVITY_PROVIDER,
                interval: 2000,
                fastestInterval: 1200,
                activitiesInterval: 10000,
                stopOnStillActivity: false,
            }
            break;
        }
        case 'ios': {
            config = {
                desiredAccuracy: 0,
                distanceFilter: 1,
                desiredOdometerAccuracy: 10,
                // Activity Recognition
                stopTimeout: 5,
                // Application config
                debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
                logLevel: BackgroundGeolocationModule.LOG_LEVEL_VERBOSE,
                stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
                startOnBoot: false,        // <-- Auto start tracking when device is powered-up.
                stationaryRadius: 1,
            }
            break;
        }
        default: {
            config = {
                desiredAccuracy: 0,
                distanceFilter: 1,
                desiredOdometerAccuracy: 10,
                // Activity Recognition
                stopTimeout: 5,
                // Application config
                debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
                logLevel: BackgroundGeolocationModule.LOG_LEVEL_VERBOSE,
                stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
                startOnBoot: false,        // <-- Auto start tracking when device is powered-up.
            }
            break;
        }
    }
    return config;

}