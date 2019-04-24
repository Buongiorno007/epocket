export const SELECT_MISSION = "selected-mission/SELECT_MISSION";

let defaultMission = {
  amount: 0,
  color: "#000",
  date_end: "",
  date_start: "",
  desc: "default description",
  id: -1,
  interval: -1,
  name: "default name",
  photo: "",
  price: 0,
  status: true,
  trade: "OWNER",
  type: 0
};

export default (state = defaultMission, action) => {
  switch (action.type) {
    case SELECT_MISSION:
      console.log(Object.assign({}, { ...state, ...action.selectedMission }));
      return Object.assign({}, { ...state, ...action.selectedMission });
    default:
      return state;
  }
};

export const selectMission = selectedMission => ({
  type: SELECT_MISSION,
  selectedMission
});
