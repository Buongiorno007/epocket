import { Platform } from 'react-native';
import BackgroundGeolocationModule from '../services/background-geolocation-picker';
import { sendToTelegramm } from '../services/telegramm-notification';
export const CHANGE_LOCATION = 'geolocation-coords/CHANGE_LOCATION';
import getCurrentGeolocation from '../services/get-location';

export default (state = { lng: 0, lat: 0 }, action) => {
  switch (action.type) {
    case CHANGE_LOCATION:
      return Object.assign({}, { ...state, ...action.location });
    default:
      return state;
  }
};

export const locationCoordsListener = () => async dispatch => {
  if (Platform.OS === 'ios') {
    BackgroundGeolocationModule.on('location', location =>
      dispatch(
        setLocation({
          lng: Number(location.coords.longitude),
          lat: Number(location.coords.latitude)
        })
      )
    );
  } else {
    BackgroundGeolocationModule.on('location', location => {
      location.lng
        ? dispatch(setLocation(location))
        : dispatch(
            setLocation({
              lat: location.latitude || 0,
              lng: location.longitude || 0
            })
          );
    });
  }
};

export const setLocation = location => {
  //sendToTelegramm('epc location : ' + JSON.stringify(location))
  return { type: CHANGE_LOCATION, location };
};

// export const setLocation = (location) => ({
//     type: CHANGE_LOCATION, location
// })
