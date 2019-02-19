import {getStorage} from "../storage";

export const setCookie = (name, value) => {
    let expires = Number(getStorage('settings').walletLock);

    if(!expires) return;

    let date = new Date(new Date().getTime() + expires * 60000);

    document.cookie = `${name}=${value}; path=/; ${date ? `expires=${date.toUTCString()}` : ''}`;
};