export const PROFILE_STATE = 'profile-state/PROFILE_STATE';
let defaultProfile = {
  user_name: "Initial Name",
  user_phone: "099-999-99-99",
  user_photo_url: ""
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
