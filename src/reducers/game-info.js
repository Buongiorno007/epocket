export const GAME_INFO = 'game-info/GAME_INFO';
import { httpGet } from "../services/http";
import { handleError } from "../services/http-error-handler";
import { setFixedTime } from "./fixedTime";
import { errorState } from "./game-error"
import { setTempTime } from "./tempTime";
import { loaderState } from "./loader";
import { resetGameExpiredTimer } from "./game-expired-timer";
import { ICONS } from "../constants/icons";
import { urls } from "../constants/urls";

const initialState = {
    description: "...",
    cost: "0",
    title: "",
    success_image: ICONS.ZIFI.SURPRISED,
    no_more_games: false,
    time: 0,
    available_game_len: 0,
    total_game_len: 0,
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
    dispatch(loaderState(true));
    let received_promise = httpGet(
        urls.game_get,
        token
    );
    received_promise.then(
        result => {
            let game = result.body;
            console.log("game", result)
            let win_array = [];
            game.game_set.forEach(el => {
                if (el.option) {
                    win_array.push(el.id);
                }
            });
            let info = {
                description: game.description,
                cost: game.award + "",
                title: game.title,
                success_image: game.insta_image_url,
                no_more_games: game.available_game_len >= 1 ? false : true,
                time: game.time,
                true_answer: win_array,
                game_array: game.game_set,
                available_game_len: game.available_game_len,
                total_game_len: game.games_count,
                insta_data: {
                    base64: game.insta_image,
                    id: game.id,
                    hash_tag: "",
                }
            }
            dispatch(setGameInfo(info))
            dispatch(setFixedTime(game.time))
            dispatch(setTempTime(game.time))
            dispatch(loaderState(false));
            dispatch(resetGameExpiredTimer(token))
        },
        error => {
            let error_response = handleError(error, "game-info", "getGameInfo")
            dispatch(errorState(error_response))
            dispatch(loaderState(false));
        }
    );

}
export const setGameInfo = (payload) => (
    {
        type: GAME_INFO, payload
    }
)


