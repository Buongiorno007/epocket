export const UPDATE_MALL = 'selected-mall/UPDATE_MALL';

let defaultMall = {
    active: false,
    adress: "",
    id: null,
    lat: 0,
    lng: 0,
    name: "",
    rad: 0,
    type: ""
}

export default (state = defaultMall, action) => {
    switch (action.type) {
        case UPDATE_MALL:
            return (action.selectedMall)  ?  Object.assign({}, { ...state, ...action.selectedMall }) :  Object.assign({}, { ...state, ...defaultMall })
        default:
            return state;
    }
}

export const updateMall = (selectedMall) => ({
    type: UPDATE_MALL,
    selectedMall
});
