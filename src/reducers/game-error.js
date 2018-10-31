export const GAME_ERROR = 'game-error/GAME_ERROR';

export default (state = {
    error_text: "",
    error_modal: false
}, action) => {
    switch (action.type) {
        case GAME_ERROR:
            return action.error
        default:
            return state;
    }
}

export const errorState = (error) => ({
    type: GAME_ERROR,
    error
})

