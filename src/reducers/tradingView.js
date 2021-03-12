const reducer = (state = false, {type, payload}) => {
    switch (type) {
        case 'SET_TV':
            return payload;
        case 'REMOVE_TV':
            return false;
        default:
            return state;
    }
};

export default reducer