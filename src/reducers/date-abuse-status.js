
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
    console.log("setDateAbuseStatus", status)
    return {
        type: UPDATE_DATE_ABUSE_STATUS,
        status
    }
}
export const loadNTPDate = () => async dispatch => {
    let deviceDate = moment().format('ddd MMM D YYYY');
    let deviceHours = moment().format('HH');
    let deviceMinutes = moment().format('mm');
    ntpClient.getNetworkTime("pool.ntp.org", 123, function (err, date) {
        if (err) {
            console.log(err);
            dispatch(setDateAbuseStatus(false))
            return;
        }
        else {
            let serverFullTime = String(date).split(" GMT")[0].slice(0, -3)
            let serverDate = String(date).split(" GMT")[0].slice(0, -9)
            let serverHours = String(serverFullTime).slice(-5, -3)
            let serverMinutes = String(serverFullTime).slice(-2)
            if (
                String(deviceDate) === String(serverDate) &&
                Number(deviceHours) === Number(serverHours) &&
                (Math.abs(Number(deviceMinutes) - Number(serverMinutes)) <= 10)
            ) {
                console.log("date time ok")
                dispatch(setDateAbuseStatus(true))
            }
            else {
                console.log("date time failed")
                dispatch(setDateAbuseStatus(false))
            }
        }
    });
};
