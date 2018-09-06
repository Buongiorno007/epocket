
import BackgroundGeolocation from "react-native-background-geolocation";

export const CHANGE_LOCATION_STATUS = 'geolocation-status/CHANGE_LOCATION_STATUS';

export default (state = false, action) => {
    switch (action.type) {
        case CHANGE_LOCATION_STATUS:
            return action.isLocation
        default:
            return state;
    }
}

export const locationStateListener = () => async dispatch => {
    BackgroundGeolocation.on('providerchange', (location) => dispatch(locationState(location.enabled)));
}

export const locationState = (isLocation) => ({
    type: CHANGE_LOCATION_STATUS,
    isLocation
})

