export const SET_GEO_VIRGIN = 'geo-virgin/SET_GEO_VIRGIN';

export default (state = [], action) => {
    switch (action.type) {
        case SET_GEO_VIRGIN:
            return action.status;
        default:
            return state;
    }
}

export const setGeoVirgin = (status) => ({
    type: SET_GEO_VIRGIN, status
})