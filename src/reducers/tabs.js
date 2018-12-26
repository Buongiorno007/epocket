import { setSecondDashboardCallBlock } from "./second-dash-call"
import { setGameStatus } from "./game-status"

export const CHANGE_ACTIVE_TAB = 'tabs/CHANGE_ACTIVE_TAB';

export default (state = { activeTab: 0 }, action) => {
    // console.log('action',action);
    switch (action.type) {
        case CHANGE_ACTIVE_TAB:
            return action.activeTab;
        default:
            return state;
    }
}
export const setState = (activeTab) => {
    {
        return {
            type: CHANGE_ACTIVE_TAB,
            activeTab
        }
    }
}
export const setTabState = (activeTab) => async dispatch => {
    dispatch(setSecondDashboardCallBlock(false));
    dispatch(setGameStatus("initial"))
    dispatch(setState(activeTab))
}

