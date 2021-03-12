const reducer = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_USER':
            return payload;
        case 'REMOVE_USER':
            return {};
        default:
            return state;
    }
};

export default reducer