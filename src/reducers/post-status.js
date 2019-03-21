export const CHANGE_POST_STATUS = 'profile-status/CHANGE_POST_STATUS';
//services
import { httpGet, httpPost } from "../services/http";
import { handleError } from "../services/http-error-handler";
import NavigationService from "../services/route";
import { convertToBase64 } from "../services/convert-to-base64"
//constants
import { urls } from "../constants/urls";
import { ICONS } from "../constants/icons";
//redux
import { loaderState } from "./loader";
import { setFixedTime } from "./fixedTime";
import { launchGameExpiredTimer } from "./game-expired-timer"
import { errorState } from "./game-error"
import { setTempTime } from "./tempTime";
import { setGameStatus } from "./game-status"
import { setGameInfo } from "./game-info"

export default (state = false, action) => {
    switch (action.type) {
        case CHANGE_POST_STATUS:
            return action.status;
        default:
            return state;
    }
};
export const changePostStatus = status => {
    return {
        type: CHANGE_POST_STATUS,
        status
    };
};
export const checkForPostStatus = (game_id, token, lat, lng, game_expired_timer) => async dispatch => {
    dispatch(loaderState(true));
    let body = JSON.stringify({
        game_id
    });
    let promise = httpPost(
        urls.post_game,
        body,
        token
    );
    promise.then(
        result => {
            dispatch(changePostStatus(true));
            let received_promise = httpGet(
                urls.game_get + "?coords=" + lat + "%2C" + lng,
                token
            );
            received_promise.then(
                result => {
                    let game = result.body;
                    if (game.ticker === false && !game.game_set) {
                        dispatch(setGameStatus("lock"));
                        dispatch(errorState(null));
                        dispatch(loaderState(false));
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
                                    cost: game.award + "",
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
                                    wait_timer: ((Number(game.future_timer)) / 60).toFixed(),
                                    brand_title: game.brand_name,
                                    website_link: game.brand_link,
                                    insta_data: {
                                        base64: 'data:image/jpg;base64,' + result,
                                        id: game.id,
                                        hash_tag: game.hash_tag,
                                    }
                                }
                                dispatch(setGameInfo(info));
                                dispatch(setFixedTime(game.time))
                                dispatch(setTempTime(game.time))
                                dispatch(loaderState(false))
                                NavigationService.navigate("Main")
                                dispatch(setGameStatus("start"))
                            }
                        );
                    }
                },
                error => {
                    if (error.code === 400) {
                        let info = {
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
                            insta_data: {}
                        }
                        dispatch(setGameInfo(info));
                        dispatch(loaderState(false));
                        NavigationService.navigate("Main")
                        dispatch(setGameStatus("start"))
                    }
                    else {
                        let error_response = handleError(error, this.component.name, "confirmPost")
                        dispatch(errorState(error_response))
                        dispatch(loaderState(false));
                    }
                }
            );
        },
        error => {
            NavigationService.navigate("Main")
            dispatch(setGameStatus("expired"))
            if (game_expired_timer) {
                dispatch(launchGameExpiredTimer(token))
            }
            else {
                dispatch(launchGameExpiredTimer(token, game_id))

            }
            handleError(error, "post-status", "checkForPostStatus")
            dispatch(changePostStatus(false));
            dispatch(loaderState(false));
        }
    );
};