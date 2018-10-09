export const GAME_INFO = 'game-info/GAME_INFO';
const initialState = {
    description: "Test description from initialState. Loooooooooooooooooooooong one.",
    cost:"2",
    title:"LACOSTE"
}
export default (state = initialState, action) => {
    switch (action.type) {
        case GAME_INFO:
            return action.payload;
        default:
            return state;
    }
}
export const getGameInfo = () => ({
    type: GAME_INFO, payload
})
export const setGameInfo = () => ({
    type: GAME_INFO, payload
})



