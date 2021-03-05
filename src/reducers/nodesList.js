const reducer = (state = [], {type, payload}) => {
    switch (type) {
        case 'SET_NODES':
            return payload;
        case 'REMOVE_NODES':
            return [];
        default:
            return state;
    }
};

export default reducer