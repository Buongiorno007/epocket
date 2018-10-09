export const SET_FIXED_TIME = 'fixedTime/SET_TEMP_TIME';
const initialState = 30
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_FIXED_TIME:
            return action.time;
        default:
            return state;
    }
}

export const setFixedTime = (time) => ({
    type: SET_FIXED_TIME,
    time
})