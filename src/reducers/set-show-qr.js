export const SHOW_QR_CHANGE = 'birthday/SHOW_QR_CHANGE';

export default (state = true, action) => {
    switch (action.type) {
        case SHOW_QR_CHANGE:
            return action.date;
        default:
            return state;
    }
}

export const setShowQR = date => {
    return {
        type: SHOW_QR_CHANGE, 
        date
    };
};