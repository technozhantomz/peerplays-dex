const reducer = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_NOTIFICATIONS':
            return payload;
        case 'REMOVE_NOTIFICATIONS':
            return {};
        default:
            return state;
    }
};

export default reducer