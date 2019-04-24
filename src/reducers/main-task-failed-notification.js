export const SHOW_FAILED_NOTIFICATION = "SHOW_FAILED_NOTIFICATION";

export default (state = false, action) => {
  // console.log('-----SHOW_FAILED_NOTIFICATION-----', action)
  switch (action.type) {
    case SHOW_FAILED_NOTIFICATION:
      return action.failedNotification;
    default:
      return state;
  }
};

export const showFailedNotification = failedNotification => ({
  type: SHOW_FAILED_NOTIFICATION,
  failedNotification
});
