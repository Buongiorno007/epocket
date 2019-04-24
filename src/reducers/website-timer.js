export const SET_WEB_SITE_TIMER = "./website-timer/SET_GAME_EXPIRED_IMAGE";

export default (state = 15, action) => {
  switch (action.type) {
    case SET_WEB_SITE_TIMER:
      return { ...state, time: action.time };
    default:
      return state;
  }
};

export const setWebSiteTimer = time => getState => {
  console.log(time, "dfsfsfsfswf");
  return {
    type: SET_WEB_SITE_TIMER,
    time
  };
};
