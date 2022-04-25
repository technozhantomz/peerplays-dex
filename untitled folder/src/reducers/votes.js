const reducer = (state = [], {type, payload}) => {
    switch (type) {
        case 'SET_VOTES':
            return payload;
        case 'CLEAR_VOTES':
            return [];
        default:
            return state;
    }
};

export default reducer