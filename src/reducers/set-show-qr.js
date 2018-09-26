export const SHOW_QR_CHANGE = 'set-show-qr/SHOW_QR_CHANGE';

export default (state = true, action) => {
    switch (action.type) {
        case SHOW_QR_CHANGE:
            return action.data;
        default:
            return state;
    }
}

export const setShowQR = data => {
    return {
        type: SHOW_QR_CHANGE, 
        data
    };
};