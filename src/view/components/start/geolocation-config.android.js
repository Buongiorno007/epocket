import { Platform } from 'react-native'
import BackgroundGeolocation from "react-native-mauron85-background-geolocation";

export default function geo_config () {
    let config = undefined;

    switch (Platform.OS) {
        case 'android': {
            config = {
                desiredAccuracy: 0,
                distanceFilter: 1,
                desiredOdometerAccuracy : 1,
                // Activity Recognition
                stopTimeout: 5,
                // Application config
                debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
                logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
                stopOnTerminate: true,   // <-- Allow the background-service to continue tracking when user closes the app.
                startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
            }
            break;
        }
        case 'ios': {
            config = {
                desiredAccuracy: 0,
                distanceFilter: 1,
                desiredOdometerAccuracy : 10,
                // Activity Recognition
                stopTimeout: 5,
                // Application config
                debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
                logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
                stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
                startOnBoot: false,        // <-- Auto start tracking when device is powered-up.
                stationaryRadius : 1,
            }
            break;
        }
        default: {
            config = {
                desiredAccuracy: 0,
                distanceFilter: 1,
                desiredOdometerAccuracy : 10,
                // Activity Recognition
                stopTimeout: 5,
                // Application config
                debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
                logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
                stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
                startOnBoot: false,        // <-- Auto start tracking when device is powered-up.
            }
            break;
        }
    }
    return config;

}