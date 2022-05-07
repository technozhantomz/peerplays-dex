const reducer = (state = [], {type, payload}) => {
    switch (type) {
        case 'SET_ACCOUNT':
            return payload.walletsList || [];
        case 'REMOVE_ACCOUNT':
            return false;
        default:
            return state;
    }
};

export default reducer