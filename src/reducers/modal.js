const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MODAL':
            return {modalContent: action.modalContent};
        case 'REMOVE_MODAL':
            return {};
        default:
            return state;
    }
};

export default reducer