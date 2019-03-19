export const GAME_INFO = 'game-info/GAME_INFO';
//services
import { httpGet, httpPost } from "../services/http";
import { handleError } from "../services/http-error-handler";
import NavigationService from "../services/route";
import { convertToBase64 } from "../services/convert-to-base64"
//redux
import { setFixedTime } from "./fixedTime";
import { errorState } from "./game-error"
import { setTempTime } from "./tempTime";
import { setGameStatus } from "./game-status"
import { setBalance } from "./user-balance"
import { loaderState } from "./loader";
import { launchGameExpiredTimer } from "./game-expired-timer";
//constants
import { ICONS } from "../constants/icons";
import { urls } from "../constants/urls";

const initialState = {
    description: "...",
    cost: "0",
    title: "",
    success_image: ICONS.FILLER,
    no_more_games: true,
    time: 0,
    available_game_len: 0,
    total_game_len: 0,
    true_answer: [],
    wait_timer: 0,
    brand_title: "",
    website_link: ""  //game.link
}
export default (state = initialState, action) => {
    switch (action.type) {
        case GAME_INFO:
            return action.payload;
        default:
            return state;
    }
}
export const passGameResult = (mission_id, api_status, token, status, insta_data) => async dispatch => {
    dispatch(loaderState(true));
    let body = JSON.stringify({
        mission_id,
        status: api_status
    });
    let promise = httpPost(
        urls.game_get,
        body,
        token
    );
    promise.then(
        result => {
            if (result.body.wallet_amount) {
                dispatch(setBalance(result.body.wallet_amount))
            }
            NavigationService.navigate("GameResult", { status, insta_data });
            dispatch(errorState(null));
            dispatch(loaderState(false));
        },
        error => {
            let error_response = handleError(error, "game-info", "passGameResult")
            NavigationService.navigate("GameResult", { status: "failed", insta_data });
            dispatch(errorState(error_response))
            dispatch(loaderState(false));
        }
    );

}
export const getGameInfo = (token, latt, long) => async dispatch => {
    dispatch(loaderState(true));
    //urls.game_get + "?coords=" + '50.45466' + "%2C" + '30.5238', KIEV
    let received_promise = httpGet(
        urls.game_get + "?coords=" + latt + "%2C" + long,
        token
    );
    received_promise.then(
        result => {
            console.log("getGameInfo", result)
            let game = result.body;
            if (game.ticker === false && !game.game_set) {
                dispatch(setGameStatus("lock"));
                dispatch(errorState(null));
                dispatch(loaderState(false));
                NavigationService.navigate("Main")
            }
            else if (game.game_set) {
                let win_array = [];
                game.game_set.forEach(el => {
                    if (el.option) {
                        win_array.push(el.id);
                    }
                });
                convertToBase64(game.insta_image_url).then(
                    result => {
                        let info = {
                            description: game.description,
                            cost: Number(Number(game.formated.amount).toFixed(2)) + "",
                            title: game.title,
                            success_image: game.insta_image_url,
                            no_more_games: false,
                            time: game.time,
                            true_answer: win_array,
                            game_array: game.game_set,
                            available_game_len: game.available_game_len,
                            total_game_len: game.games_count,
                            id: game.id,
                            video: game.video,
                            wait_timer: ((5000) / 60).toFixed(),
                            brand_title: "bla-bla",
                            website_link: "http://google.com",  //game.link
                            insta_data: {
                                base64: 'data:image/jpg;base64,' + result,
                                id: game.id,
                                hash_tag: game.hash_tag,
                            }
                        }
                        dispatch(setGameInfo(info))
                        dispatch(setFixedTime(game.time))
                        dispatch(setTempTime(game.time))
                        dispatch(errorState(null));
                        //dispatch(loaderState(false));
                        dispatch(launchGameExpiredTimer(token))
                    }
                )
            }
        },
        error => {
            if (error.code === 400) {
                let info = {
                    description: "...",
                    cost: "0",
                    title: "",
                    success_image: "",
                    no_more_games: true,
                    time: 0,
                    available_game_len: 0,
                    total_game_len: 0,
                    true_answer: [],
                    wait_timer: 0,
                    brand_title: "",
                    insta_data: {}
                }
                dispatch(setGameInfo(info))
                dispatch(errorState(null));
                dispatch(loaderState(false));
            }
            else {
                let error_response = handleError(error, "game-info", "getGameInfo")
                dispatch(errorState(error_response))
                dispatch(loaderState(false));
            }
        }
    );

}
export const setGameInfo = (payload) => (
    {
        type: GAME_INFO, payload
    }
)


