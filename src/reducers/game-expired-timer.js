export const GAME_TIMER = 'game-expired-timer/GAME_TIMER';

export default (state = 1800, action) => {
    switch (action.type) {
        case GAME_TIMER:
            return action.time;
        default:
            return state;
    }
}
export const setGameExpiredTimer = (time) => ({
    type: GAME_TIMER, time
})



