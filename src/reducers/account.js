const reducer = (state = false, {type, payload}) => {
    switch (type) {
        case 'SET_ACCOUNT':
            return payload;
        case 'REMOVE_ACCOUNT':
            return false;
        default:
            return state;
    }
};

export default reducer