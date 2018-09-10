
import BackgroundGeolocation from "react-native-mauron85-background-geolocation";

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
    BackgroundGeolocation.on('authorization', (authorization) => {
        BackgroundGeolocation.checkStatus(status => {
            dispatch(locationState(status.locationServicesEnabled))
          });
    });
}

export const locationState = (isLocation) => {
    // console.log("isLocation", isLocation)
    return { type: CHANGE_LOCATION_STATUS, isLocation }
}

