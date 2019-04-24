export const UPDATE_DASHBOARD = "show-dashboard/UPDATE_DASHBOARD";

export default (state = false, action) => {
  // console.log('updatedashboard',action)
  switch (action.type) {
    case UPDATE_DASHBOARD:
      return action.dashboard;
    default:
      return state;
  }
};

export const showDashboard = dashboard => ({
  type: UPDATE_DASHBOARD,
  dashboard
});
