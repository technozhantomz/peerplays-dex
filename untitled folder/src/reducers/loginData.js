const reducer = (state = false, {type, payload}) => {
    switch (type) {
        case 'SET_ACCOUNT':
            return payload.loginData;
        case 'UPDATE_LOGIN_DATA':
            return payload;
        case 'CLEAR_LOGIN_DATA':
            return false;
        case 'REMOVE_ACCOUNT':
            return false;
        default:
            return state;
    }
};

export default reducer