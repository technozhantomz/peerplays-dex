const reducer = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_INSTANCE':
            return payload;
        case 'REMOVE_INSTANCE':
            return {};
        default:
            return state;
    }
};

export default reducer