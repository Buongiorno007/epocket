export const GAME_STATUS = 'game-status/GAME_STATUS';

export default (state = "expired", action) => {
    switch (action.type) {
        case GAME_STATUS:
            return action.status;
        default:
            return state;
    }
}
// status can be one of:
//   no-games (0/10 games left)
//   start (game can be played, start page will be rendered on 4-th tab)
//   game (game in progress, game page will be rendered on 4-th tab)
//   success (game finished - epc achieved)
//   failed (game finished and failed)
//   expired (game finished and expired, expired page will be rendered on 4-th tab)
export const setGameStatus = (status) => ({
    type: GAME_STATUS, status
})



