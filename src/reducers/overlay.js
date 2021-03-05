const reducer = (state = '', {type, payload}) => {
    switch (type) {
        case 'SET_OVERLAY':
            return payload;
        case 'REMOVE_OVERLAY':
            return '';
        default:
            return state;
    }
};

export default reducer