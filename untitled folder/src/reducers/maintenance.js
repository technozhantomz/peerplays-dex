const reducer = (state = false, {type, payload}) => {
    switch (type) {
        case 'SET_MAINTENANCE':
            return payload;
        default:
            return state;
    }
};

export default reducer