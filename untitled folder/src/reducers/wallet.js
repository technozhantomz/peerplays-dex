const reducer = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_WALLET':
            return payload;
        default:
            return state;
    }
};

export default reducer