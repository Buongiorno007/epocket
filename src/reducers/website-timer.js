export const SET_WEB_SITE_TIMER = "./website-timer/SET_WEB_SITE_TIMER";

export default (state = 15, action) => {
  switch (action.type) {
    case SET_WEB_SITE_TIMER:
      return { ...state, time: action.time };
    default:
      return state;
  }
};

export const setWebSiteTimer = time  => {
  console.log(time, "dfsfsfsfswf");
  return {
    type: SET_WEB_SITE_TIMER,
    time
  };
};
