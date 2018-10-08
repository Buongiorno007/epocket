export const INFO_PICK = 'info/INFO_PICK';

export default (state = false, action) => {
    switch (action.type) {
        case INFO_PICK:
            return action.status;
        default:
            return state;
    }
}

export const setInfo = (status) => ({
    type: INFO_PICK, status
})



