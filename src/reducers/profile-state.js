import { AsyncStorage } from "react-native";
export const PROFILE_STATE = 'profile-state/PROFILE_STATE';
let defaultProfile = {
  name: "",
  phone: "",
  photo: "",
  sex: null,
  birthDay: ""
};
export default (state = defaultProfile, action) => {
  switch (action.type) {
    case PROFILE_STATE:
      return action.user;
    default:
      return state;
  }
};
export const saveUser = user => {
  AsyncStorage.setItem("user_info", JSON.stringify(user));
  return {
    type: PROFILE_STATE,
    user
  };
};
