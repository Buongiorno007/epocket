export const GAME_ERROR = 'game-error/GAME_ERROR';

export default (state = null, action) => {
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

