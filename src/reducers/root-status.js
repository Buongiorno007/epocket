
import JailMonkey from 'jail-monkey'
import RNMockLocationDetector from '../native_modules/react-native-mock-location-detector';
export const UPDATE_ROOT_STATUS = 'root-status/UPDATE_ROOT_STATUS';

export default (state = true, action) => {
    switch (action.type) {
        case UPDATE_ROOT_STATUS:
            return action.status
        default:
            return state;
    }
}
export const setRootStatus = (status) => {
    return {
        type: UPDATE_ROOT_STATUS,
        status
    }
}
export const updateRootStatus = () => async dispatch => {
    let status = JailMonkey.trustFall()
    console.log("jail monkey status ('false' means everything is ok, no root): " + status)
    if (!status) { // run additional check if jail monkey failed
        dispatch(
            RNMockLocationDetector.checkMockLocationProvider(function mockCallBack(status) {
                console.log("RNMockLocationDetector", status)
                dispatch(setRootStatus(status))
            })
        )
    }
    else {
        dispatch(setRootStatus(status))
    }
};
