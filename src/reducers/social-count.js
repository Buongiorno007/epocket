export const SOCIAL_COUNT = "social-count/SOCIAL_COUNT";

export default (state = 0, action) => {
  switch (action.type) {
    case SOCIAL_COUNT:
      return action.count;
    default:
      return state;
  }
};

export const setCount = count => ({
  type: SOCIAL_COUNT,
  count
});
