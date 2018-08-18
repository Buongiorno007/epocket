export const RELOAD_TIMER = "timer/RELOAD_TIMER";

export default (state = {}, action) => {
  switch (action.type) {
    case RELOAD_TIMER:
      return action.timer;
    default:
      return state;
  }
};

export const reloadTimer = timer => ({
  type: RELOAD_TIMER,
  timer
});
