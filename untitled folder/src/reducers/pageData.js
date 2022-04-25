const reducer = (state = {}, {type, payload}) => {
    switch (type) {
        case 'SET_PAGE':
            return payload;
        case 'UPDATE_PAGE':
            return {...state, ...payload};
        case 'CLEAR_PAGE':
            return {};
        default:
            return state;
    }
};

export default reducer