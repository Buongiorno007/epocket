import { NetInfo, AppState } from 'react-native';

export const UPDATE_CONNECTION = 'net-info/UPDATE_CONNECTION';

export default (state = false, action) => {
    // console.log('getConnection',action)
	switch (action.type) {
		case UPDATE_CONNECTION:
			return action.connection;
		default:
			return state;
	}
}

export const getConnection = () => async dispatch => {
    NetInfo.isConnected.addEventListener('connectionChange', (connection) => dispatch(getStatus(connection)));
    AppState.addEventListener('change', () => {
        NetInfo.isConnected.addEventListener('connectionChange', (connection) => dispatch(getStatus(connection)));
    });
}

export const getStatus = (connection) => ({
    type: UPDATE_CONNECTION,
    connection
});
