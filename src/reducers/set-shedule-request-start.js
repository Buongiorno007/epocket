export const SHEDULE_REQUEST_START_CHANGE = 'set-shedule-request-start/SHEDULE_REQUEST_START_CHANGE';

export default (state = false, action) => {
    switch (action.type) {
        case SHEDULE_REQUEST_START_CHANGE:
            return action.data;
        default:
            return state;
    }
}

export const setSheduleRequestStart = data => {
    return {
        type: SHEDULE_REQUEST_START_CHANGE, 
        data
    };
};