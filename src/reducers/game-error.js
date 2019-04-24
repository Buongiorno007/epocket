export const GAME_ERROR = "game-error/GAME_ERROR";
const initialState = {
  error_text: "",
  error_modal: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GAME_ERROR:
      return action.error;
    default:
      return state;
  }
};

export const errorState = data => {
  let error;
  if (data === null) {
    error = initialState;
  } else {
    error = data;
  }
  return {
    type: GAME_ERROR,
    error
  };
};
