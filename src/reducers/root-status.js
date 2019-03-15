
import {
    Platform
} from "react-native";
import JailMonkey from 'jail-monkey'
import RNMockLocationDetector from '../native_modules/react-native-mock-location-detector';
import { loaderState } from "./loader";
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
export const additionalCheckMock = () => async dispatch => {
    RNMockLocationDetector.checkMockLocationProvider(function mockCallBack(status) {
        dispatch(setRootStatus(status))
        dispatch(loaderState(false))
    })
}
export const updateRootStatus = () => async dispatch => {
    let status = JailMonkey.trustFall()
    if (!status && Platform.OS != "ios") { // run additional check if jail monkey failed
        dispatch(additionalCheckMock())
    }
    else {
        dispatch(setRootStatus(status))
        dispatch(loaderState(false))
    }
};
