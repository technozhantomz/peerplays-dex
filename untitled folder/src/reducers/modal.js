const reducer = (state = false, {type, payload}) => {
    switch (type) {
        case 'SET_MODAL':
            return payload;
        case 'CLOSE_MODAL':
            return false;
        default:
            return state;
    }
};

export default reducer