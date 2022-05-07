import {editStorage, getStorage} from "../storage";
import {setPassword} from "../../dispatch/passwordDispatch";

export const setCookie = (name, value) => {
    const expires = Number(getStorage('settings').walletLock);

    if(!expires) return;

    const passwordExpiration = new Date().getTime() + expires * 60000;
    // const passwordExpiration = new Date().getTime() + expires * 1000;
    const date = new Date(passwordExpiration);

    editStorage('account', {passwordExpiration});
    setPassword(passwordExpiration);

    document.cookie = `${name}=${value}; path=/; ${date ? `expires=${date.toUTCString()}` : ''}`;
};