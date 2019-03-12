
import JailMonkey from 'jail-monkey'
export const UPDATE_ROOT_STATUS = 'root-status/UPDATE_ROOT_STATUS';

export default (state = true, action) => {
    switch (action.type) {
        case UPDATE_ROOT_STATUS:
            return action.status
        default:
            return state;
    }
}

export const updateRootStatus = () => {
    let status = JailMonkey.trustFall()
    console.log("jail monkey test: " + status)
    return {
        type: UPDATE_ROOT_STATUS,
        status
    }
};
