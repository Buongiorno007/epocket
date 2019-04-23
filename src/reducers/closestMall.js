export const UPDATE_CLOSEST_MALL = "closetMall/UPDATE_CLOSEST_MALL";

let defaultMall = {
  active: false,
  adress: "",
  id: null,
  lat: 0,
  lng: 0,
  name: "",
  rad: 0,
  type: ""
};

export default (state = defaultMall, action) => {
  switch (action.type) {
    case UPDATE_CLOSEST_MALL:
      return action.closestMall
        ? Object.assign({}, { ...state, ...action.closestMall })
        : Object.assign({}, { ...state, ...defaultMall });
    default:
      return state;
  }
};

export const updateClosMall = closestMall => ({
  type: UPDATE_CLOSEST_MALL,
  closestMall
});
