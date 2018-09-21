export const PROFILE_STATE = 'profile-state/PROFILE_STATE';
let defaultProfile = {
  name: "",
  phone: "",
  photo: "",
  sex : null,
  birthDay : "",
  token : null,
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
  return {
    type: PROFILE_STATE,
    user
  };
};
