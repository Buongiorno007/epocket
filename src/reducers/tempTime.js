// import console = require("console");

export const SET_TEMP_TIME = "tempTime/SET_TEMP_TIME";
const initialState = 30;
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TEMP_TIME:
      return action.time;
    default:
      return state;
  }
};

export const setTempTime = time => {
  return {
    type: SET_TEMP_TIME,
    time
  };
};
