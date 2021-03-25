const reducer = (state = false, {type, payload}) => {
    switch (type) {
        case 'SET_SIDECHAIN_ACCOUNTS':
            return payload;
        default:
            return state;
    }
};

export default reducer