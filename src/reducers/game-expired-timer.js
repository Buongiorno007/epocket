export const GAME_TIMER = 'game-expired-timer/GAME_TIMER';
export const GAME_TIMER_RESET = 'game-expired-timer/GAME_TIMER_RESET';
export default (state = 30, action) => {
    switch (action.type) {
        case GAME_TIMER:
            return action.time;
        case GAME_TIMER_RESET:
            return 30;
        default:
            return state;
    }
}
export const setGameExpiredTimer = (time) => ({
    type: GAME_TIMER, time
})

export const resetGameExpiredTimer = () => ({
    type: GAME_TIMER_RESET
})

