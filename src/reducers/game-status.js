export const GAME_STATUS = 'game-status/GAME_STATUS';

export default (state = "start", action) => {
    switch (action.type) {
        case GAME_STATUS:
            return action.status;
        default:
            return state;
    }
}
// status can be one of:
//   no-games
//   start
//   game
//   success
//   failed
//   expired
export const setGameStatus = (status) => ({
    type: GAME_STATUS, status
})



