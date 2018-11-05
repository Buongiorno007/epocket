export const WAIT_TIMER = 'game-expired-timer/WAIT_TIMER';
//services
import { httpPost } from '../services/http'
import { handleError } from "../services/http-error-handler";
import { convertToBase64 } from "../services/convert-to-base64"
//redux
import { loaderState } from "./loader";
import { setGameStatus } from "./game-status"
import { setGameExpiredImage } from "./game-expired-image"
import { errorState } from "./game-error"
//constants
import { ICONS } from "../constants/icons";
import { urls } from "../constants/urls";


export default (state = 1, action) => {
    switch (action.type) {
        case WAIT_TIMER:
            return action.time;
        default:
            return state;
    }
}
export const shutDownExpiredTimer = (token, id) => async dispatch => {
    let body = {
        is_played: "True",
        id
    }
    let received_promise = httpPost(
        urls.game_expired_timer,
        JSON.stringify(body),
        token
    );
    received_promise.then(
        result => {
            let time = result.body.time;
            dispatch(setGameExpiredTimer(time))
            dispatch(setGameStatus("start"))
            dispatch(errorState(null));
        },
        error => {
            let error_response = handleError(error, "game-expired-time", "shutDownExpiredTimer")
            dispatch(errorState(error_response))
            dispatch(loaderState(false));
        }
    );
}
export const resetGameExpiredTimer = (token) => async dispatch => {
    dispatch(loaderState(true));
    let body = {
    }
    let received_promise = httpPost(
        urls.game_expired_timer,
        JSON.stringify(body),
        token
    );
    received_promise.then(
        result => {
            let time = result.body.time;
            convertToBase64(result.body.image).then(
                result => {
                    let id = result.body.image.split('_')[0].split('id')[1];
                    console.log("id", id)
                    dispatch(setGameExpiredImage({ id: id, img: result.body.image, base64: 'data:image/jpg;base64,' + result }))
                    dispatch(setGameExpiredTimer(time))
                    if (time === 0) {
                        dispatch(setGameStatus("start"))
                    }
                    else {
                        dispatch(setGameStatus("expired"))
                    }
                    dispatch(errorState(null));
                    dispatch(loaderState(false));
                },
                error => { });
        },
        error => {
            let error_response = handleError(error, "game-expired-time", "resetGameExpiredTimer")
            dispatch(errorState(error_response))
            dispatch(loaderState(false));
        }
    );
}
export const startExpiredTimer = (token, id) => async dispatch => {
    dispatch(loaderState(true));
    let body = {
        is_played: "False",
        id
    }
    let received_promise = httpPost(
        urls.game_expired_timer,
        JSON.stringify(body),
        token
    );
    received_promise.then(
        result => {
            let time = result.body.time;
            dispatch(setGameExpiredTimer(time))
            dispatch(errorState(null));
            dispatch(loaderState(false));
        },
        error => {
            let error_response = handleError(error, "game-expired-time", "startExpiredTimer")
            dispatch(errorState(error_response))
            dispatch(loaderState(false));
        }
    );

}
export const setGameExpiredTimer = (time) => ({
    type: WAIT_TIMER, time
})
export const setError = (error) => ({
    type: GAME_ERROR, error
})
