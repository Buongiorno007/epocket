import { AsyncStorage } from "react-native";
// import console = require("console");
export const GAME_STATUS = "game-status/GAME_STATUS";

export default (state = "initial", action) => {
  switch (action.type) {
    case GAME_STATUS:
      return action.status;
    default:
      return state;
  }
};
// status can be one of:
//   start (game can be played, start page will be rendered on 4-th tab)
//   game (game in progress, game page will be rendered on 4-th tab)
//   success (game finished - epc achieved)
//   failed (game finished and failed)
//   expired (game finished and expired, expired page will be rendered on 4-th tab)
//   lock (user have passed 100 games, so now he have to check in)
export const setGameStatus = status => {
  // console.log("status ===============", status)
  AsyncStorage.setItem("game_status", status);
  return {
    type: GAME_STATUS,
    status
  };
};
