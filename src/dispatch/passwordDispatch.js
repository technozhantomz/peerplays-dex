import {store} from '../index';
import {getStorage} from "../actions/storage";

export const setPassword = data => {
    const expires = Number(getStorage('settings').walletLock);
    const prevData = store.getState().password;

    if(prevData.timer) clearTimeout(prevData.timer);
    if(!expires) return;

    const passwordExpiration = expires * 60000;

    const timer = setTimeout(removePassword, passwordExpiration);

    const payload = { data, timer };

    store.dispatch({type: 'SET_PASSWORD', payload})
};

export const removePassword = () => {
    const prevData = store.getState().password;
    if(prevData.timer) clearTimeout(prevData.timer);
    store.dispatch({type: 'REMOVE_PASSWORD'});
};