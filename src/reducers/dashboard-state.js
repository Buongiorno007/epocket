export const DASHBOARD_STATE = 'dashboard-state/DASHBOARD_STATE';

export default (state = 2, action) => {
  switch (action.type) {
    case DASHBOARD_STATE:
      return action.dashboardState;
    default:
      return state;
  }
};

export const setDashboardState = dashboardState => ({
  type: DASHBOARD_STATE,
  dashboardState
});
