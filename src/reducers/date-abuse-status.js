
import {
    Platform
} from "react-native";
import { loaderState } from "./loader";
export const UPDATE_DATE_ABUSE_STATUS = 'root-status/UPDATE_ROOT_STATUS';
import ntpClient from "react-native-ntp-client";
import moment from "moment";

export default (state = true, action) => {
    switch (action.type) {
        case UPDATE_DATE_ABUSE_STATUS:
            return action.status
        default:
            return state;
    }
}
export const setDateAbuseStatus = (status) => {
    return {
        type: UPDATE_DATE_ABUSE_STATUS,
        status
    }
}
export const loadNTPDate = () => async dispatch => {
    ntpClient.getNetworkTime("pool.ntp.org", 123, function (err, date) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.log(moment().format('ddd MMM D YYYY H:mm'))
            console.log("Current time : ");
            console.log(String(date).split(" GMT")[0].slice(0, -3)); // Mon Jul 08 2013 21:31:31 GMT+0200 (Paris, Madrid (heure d’été))
            if (String(moment().format('ddd MMM D YYYY H:mm')) === String(String(date).split(" GMT")[0].slice(0, -3))) {
                dispatch(setDateAbuseStatus(false))
            }
            else {
                dispatch(setDateAbuseStatus(true))
            }
        }
    });
};
