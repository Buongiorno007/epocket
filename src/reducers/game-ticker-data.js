export const GAME_TICKER_DATA = 'game-ticker-data/GAME_TICKER_DATA';

export default (state = {}, action) => {
    switch (action.type) {
        case GAME_TICKER_DATA:
            return action.data;
        default:
            return state;
    }
}
export const setGameTickerData = (data) => {
    return {
        type: GAME_TICKER_DATA, data
    }
}



