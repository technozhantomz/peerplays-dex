import {getStorage} from "../storage";

export const getStoragedAccount = () => {
    const account = getStorage('account');
    return account.type ? account : getStorage('account', 'sessionStorage');
};