export const SET_FIXED_TIME = 'fixedTime/SET_FIXED_TIME';
const initialState = 30
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_FIXED_TIME:
            return action.time;
        default:
            return state;
    }
}

export const setFixedTime = (time) => {
    return {
        type: SET_FIXED_TIME,
        time
    }
}