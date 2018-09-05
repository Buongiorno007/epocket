import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import {sendToTelegramm} from '../services/telegramm-notification'
export const CHANGE_LOCATION = 'geolocation-coords/CHANGE_LOCATION';

export default (state = { lng: 0, lat: 0 }, action) => {
    switch (action.type) {
        case CHANGE_LOCATION:
            //  console.log('location',action.location)
            return Object.assign({}, { ...state, ...action.location })
        default:
            return state;
    }
}

export const locationCoordsListener = () => async dispatch => {
    BackgroundGeolocation.on('location', (location) => dispatch(
        setLocation({
            lng: Number(location.coords.longitude),
            lat: Number(location.coords.latitude)
        })
    ));
}

export const setLocation = (location) => {
    // sendToTelegramm('anton '+JSON.stringify(location))
    return {type: CHANGE_LOCATION, location}
}

// export const setLocation = (location) => ({
//     type: CHANGE_LOCATION, location
// })