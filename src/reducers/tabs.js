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

export const setTabState = (activeTab) => ({
    type: CHANGE_ACTIVE_TAB,
    activeTab
})

