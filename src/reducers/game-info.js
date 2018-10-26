export const GAME_INFO = 'game-info/GAME_INFO';
import { httpGet } from "../services/http";
import { setFixedTime } from "./fixedTime";
import { setTempTime } from "./tempTime";
import { ICONS } from "../constants/icons";
import { urls } from "../constants/urls";

const initialState = {
    description: "",
    cost: "",
    title: "",
    success_image: ICONS.ZIFI.SURPRISED,
    no_more_games: false,
    time: 0,
    true_answer: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case GAME_INFO:
            return action.payload;
        default:
            return state;
    }
}
export const getGameInfo = (token) => async dispatch => {
    let received_promise = httpGet(
        urls.game_get,
        token
    );
    received_promise.then(
        result => {
            let game = result.body;
            console.log("game", result)
            let win_array;
            // game.game_set.forEach(el => {
            //     if (el.option) {
            //         win_array.push(el.id);
            //     }
            // });
            let info = {
                description: game.description,
                cost: game.award,
                title: "LACOSTE", // no api ?????
                success_image: ICONS.ZIFI.SURPRISED,
                no_more_games: game.available_game_len >= 1 ? false : true,
                time: game.time,
                true_answer: win_array,
                available_game_len: game.available_game_len
            }
            dispatch(setGameInfo(info))
        },
        error => {
            console.log("error", error)
            dispatch(setError(error))
        }
    );

}
export const setGameInfo = (payload) => async dispatch => {
    console.log("game", payload)
    dispatch(setFixedTime(payload.time))
    dispatch(setTempTime(payload.time))
    return {
        type: GAME_INFO, payload
    }
}
export const setError = (error) => ({
    type: GAME_ERROR, error
})



