export const GAME_INFO = 'game-info/GAME_INFO';
import { httpGet } from "../services/http";
import { handleError } from "../services/http-error-handler";
import { setFixedTime } from "./fixedTime";
import { setTempTime } from "./tempTime";
import { loaderState } from "./loader";
import { ICONS } from "../constants/icons";
import { urls } from "../constants/urls";

const initialState = {
    description: "initialState",
    cost: "initialState",
    title: "initialState",
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
                title: "LACOSTE", // no api ?????
                success_image: ICONS.ZIFI.SURPRISED,
                no_more_games: game.available_game_len >= 1 ? false : true,
                time: 30,
                true_answer: win_array,
                game_array: game.game_set,
                available_game_len: game.available_game_len,
                total_game_len: game.games_count
            }
            dispatch(setGameInfo(info))
            dispatch(setFixedTime(30))
            dispatch(setTempTime(30))
            dispatch(loaderState(false));
        },
        error => {
            console.log("error", error)
            let error_respons = handleError(error, this.constructor.name, "loadData");
            this.setState({ errorText: error_respons.error_text });
            this.setModalVisible(error_respons.error_modal);
            dispatch(setError(error_respons))
            dispatch(loaderState(false));
        }
    );

}
export const setGameInfo = (payload) => (
    {
        type: GAME_INFO, payload
    }
)
export const setError = (error) => ({
    type: GAME_ERROR, error
})



