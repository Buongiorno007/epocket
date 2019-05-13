export const GAME_INFO = "game-info/GAME_INFO";
//services
import { httpGet, httpPost } from "../services/http";
import { handleError } from "../services/http-error-handler";
import NavigationService from "../services/route";
import { convertToBase64 } from "../services/convert-to-base64";
//redux
import { setFixedTime } from "./fixedTime";
import { errorState } from "./game-error";
import { setTempTime } from "./tempTime";
import { setGameStatus } from "./game-status";
import { setBalance } from "./user-balance";
import { loaderState } from "./loader";
import { setGameTickerData } from "./game-ticker-data";
import { launchGameExpiredTimer } from "./game-expired-timer";
//constants
import { ICONS } from "../constants/icons";
import { urls } from "../constants/urls";

const initialState = {
  description: "...",
  cost: "0",
  title: "",
  success_image: ICONS.FILLER,
  no_more_games: false,
  time: 0,
  available_game_len: 0,
  total_game_len: 0,
  true_answer: [],
  wait_timer: 0,
  wait_timer_in_sec: 0,
  brand_title: "",
  website_link: "" //game.link
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GAME_INFO:
      return action.payload;
    default:
      return state;
  }
};
export const passGameResult = (
  mission_id,
  api_status,
  token,
  status,
  insta_data
) => async dispatch => {
  dispatch(loaderState(true));
  let body = JSON.stringify({
    mission_id,
    status: api_status
  });
  let promise = httpPost(urls.game_get, body, token);
  promise.then(
    result => {
      if (result.body.wallet_amount) {
        dispatch(setBalance(result.body.wallet_amount));
      }
      NavigationService.navigate("GameResult", { status, insta_data });
      dispatch(errorState(null));
      dispatch(loaderState(false));
    },
    error => {
      let error_response = handleError(
        error,
        body,
        urls.game_get,
        token,
        "game-info",
        "passGameResult"
      );
      NavigationService.navigate("GameResult", {
        status: "failed",
        insta_data
      });
      dispatch(errorState(error_response));
      dispatch(loaderState(false));
    }
  );
};

export const getGameInfo = (token, latt, long) => async (
  dispatch,
  getState
) => {
  dispatch(loaderState(true));
  const { distance } = getState();
  httpGet(urls.game_get + "?coords=" + latt + "%2C" + long, token).then(
    result => {
      // console.log("getGameInfo", result);
      let game = result.body;
      if (game.ticker === false && !game.game_set) {
        // game.ticker === false && !game.game_set
        dispatch(setGameStatus("lock"));
        dispatch(errorState(null));
        dispatch(loaderState(false));
        NavigationService.navigate("Main");
        if (game.brand_partners.lenght % 2 != 0)
          game.brand_partners.push({ invisible: true });
        dispatch(setGameTickerData(game));
      } else if (game.game_set) {
        let win_array = [];
        game.game_set.forEach(el => {
          if (el.option) {
            win_array.push(el.id);
          }
        });
        convertToBase64(game.insta_image_url).then(result => {
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
            wait_timer: (Number(game.future_timer) / 60).toFixed(),
            wait_timer_in_sec: Number(game.future_timer),
            brand_title: game.brand_name,
            website_link: game.game_link || game.brand_link, //game.brand_link
            insta_data: {
              base64: "data:image/jpg;base64," + result,
              id: game.id,
              hash_tag: game.hash_tag
            }
          };
          dispatch(setGameInfo(info));
          dispatch(setFixedTime(game.time));
          dispatch(setTempTime(game.time));
          dispatch(errorState(null));
          //dispatch(loaderState(false));
          dispatch(launchGameExpiredTimer(token));
        });
      }
    },
    error => {
      // console.log("game info err", error);
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
          wait_timer_in_sec: 0,
          brand_title: "",
          insta_data: {}
        };
        dispatch(setGameInfo(info));
        dispatch(errorState(null));
        dispatch(loaderState(false));
      } else {
        let error_response = handleError(
          error,
          {},
          urls.game_get + "?coords=" + latt + "%2C" + long,
          token,
          "game-info",
          "getGameInfo"
        );
        dispatch(errorState(error_response));
        dispatch(loaderState(false));
      }
    }
  );
};
export const setGameInfo = payload => ({
  type: GAME_INFO,
  payload
});
