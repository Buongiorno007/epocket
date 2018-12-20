export const SET_PROFILE_VIRGIN = 'profile-virgin/SET_PROFILE_VIRGIN';

export default (state = [], action) => {
    switch (action.type) {
        case SET_PROFILE_VIRGIN:
            return action.status;
        default:
            return state;
    }
}

export const setProfileVirgin = (status) => ({
    type: SET_PROFILE_VIRGIN, status
})