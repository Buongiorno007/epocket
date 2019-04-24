export const SET_FIXED_TIME = "./fixedTime/SET_FIXED_TIME";
export default (state = null, action) => {
  switch (action.type) {
    case SET_FIXED_TIME:
      return action.time;
    default:
      return state;
  }
};

export const setFixedTime = time => {
  return {
    type: SET_FIXED_TIME,
    time
  };
};
