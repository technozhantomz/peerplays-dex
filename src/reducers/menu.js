const reducer = (state = false, {type}) => {
    switch (type) {
        case 'OPEN_MENU':
            return true;
        case 'CLOSE_MENU':
            return false;
        default:
            return state;
    }
};

export default reducer