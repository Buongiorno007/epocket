export const SET_MISSIONS = "missions/SET_MISSIONS";

export default (state = [], action) => {
  switch (action.type) {
    case SET_MISSIONS:
      return action.missions;
    default:
      return state;
  }
};

export const setMissions = missions => ({
  type: SET_MISSIONS,
  missions
});
