import { AppState } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { httpGet } from '../services/http';
import { urls } from '../constants/urls';

export const UPDATE_CONNECTION = 'net-info/UPDATE_CONNECTION';

export default (state = true, action) => {
  switch (action.type) {
    case UPDATE_CONNECTION:
      return action.connection;
    default:
      return state;
  }
};

export const checkForInternetReacheable = connection => async dispatch => {
  if (connection) {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type === 'none') {
        dispatch(getStatus(false));
      } else {
        dispatch(getStatus(true));
        httpGet(urls.echo).then(
          result => {
            dispatch(getStatus(true));
          },
          error => {
            dispatch(getStatus(false));
          }
        );
      }
    });
  } else {
    dispatch(getStatus(false));
  }
};
export const getConnection = () => async dispatch => {
  NetInfo.isConnected.addEventListener('connectionChange', connection =>
    dispatch(checkForInternetReacheable(connection))
  );
  AppState.addEventListener('change', () => {
    NetInfo.isConnected.addEventListener('connectionChange', connection =>
      dispatch(checkForInternetReacheable(connection))
    );
  });
};

export const getStatus = connection => ({
  type: UPDATE_CONNECTION,
  connection
});
