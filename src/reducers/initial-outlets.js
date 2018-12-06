export const SET_INITIAL_OUTLETS = 'initial_outlets/SET_INITIAL_OUTLETS';

export default (state = [], action) => {
    switch (action.type) {
        case SET_INITIAL_OUTLETS:
            console.log(action.outlets)
            return action.outlets;
        default:
            return state;
    }
}

export const setInitialOutlets = (outlets) => ({
    type: SET_INITIAL_OUTLETS, outlets
})

