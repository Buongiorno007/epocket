export const SECOND_DASH_CALL = 'second-dash-call/SECOND_DASH_CALL';

export default (state = false, action) => {
    switch (action.type) {
        case SECOND_DASH_CALL:
            return action.data;
        default:
            return state;
    }
}

export const setSecondDashboardCallBlock = data => {
    return {
        type: SECOND_DASH_CALL,
        data
    };
};