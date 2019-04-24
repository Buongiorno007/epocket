export const UPDATE_TIMER = "timer/UPDATE_TIMER";

let def_time = {
  hours: 0,
  minutes: 0,
  seconds: 0
};
export default (state = def_time, action) => {
  // console.log('timerStatus',action)
  switch (action.type) {
    case UPDATE_TIMER:
      return action.timer;
    default:
      return state;
  }
};

export const updateTimer = timer => ({
  type: UPDATE_TIMER,
  timer
});
