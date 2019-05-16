import { Platform } from 'react-native';
import BackgroundGeolocationModule from '../services/background-geolocation-picker';
export const CHANGE_LOCATION_STATUS =
  'geolocation-status/CHANGE_LOCATION_STATUS';

export default (state = false, action) => {
  switch (action.type) {
    case CHANGE_LOCATION_STATUS:
      return action.isLocation;
    default:
      return state;
  }
};

export const locationStateListener = () => async dispatch => {
  if (Platform.OS === 'ios') {
    BackgroundGeolocationModule.on('providerchange', location =>
      dispatch(locationState(location.enabled))
    );
  } else {
    BackgroundGeolocationModule.on('authorization', authorization => {
      BackgroundGeolocationModule.checkStatus(status => {
        dispatch(locationState(status.isRunning && status.hasPermissions));
      });
    });
  }
};

export const locationState = isLocation => {
  return { type: CHANGE_LOCATION_STATUS, isLocation };
};
