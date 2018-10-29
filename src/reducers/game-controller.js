export const EDIT_GAME_GRID = './game-controller/EDIT_GAME_GRID';
initialState = {
    game_images: [
        { id: 1, pressed: false },
        { id: 2, pressed: false },
        { id: 3, pressed: false },
        { id: 4, pressed: false },
        { id: 5, pressed: false },
        { id: 6, pressed: false },
        { id: 7, pressed: false },
        { id: 8, pressed: false },
        { id: 9, pressed: false }
    ]
}
export default (state = initialState, action) => {
    switch (action.type) {
        case EDIT_GAME_GRID:
            return {
                ...state,
                game_images: state.game_images.map(game_element => game_element.id === action.id ?
                    { ...game_element, pressed: !game_element.pressed } :
                    game_element
                )
            };
        default:
            return state;
    }
}

export const editGame = (id) => (
    {
        type: EDIT_GAME_GRID,
        id
    }
)