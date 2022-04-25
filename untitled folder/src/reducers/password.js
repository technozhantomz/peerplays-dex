const reducer = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_PASSWORD':
            return payload;
        case 'REMOVE_PASSWORD':
            return {};
        default:
            return state;
    }
};

export default reducer