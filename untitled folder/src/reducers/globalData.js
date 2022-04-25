const reducer = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_GLOBALS':
            return payload;
        case 'REMOVE_GLOBALS':
            return {};
        default:
            return state;
    }
};

export default reducer