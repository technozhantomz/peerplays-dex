import {store} from "../index";

export const setAccount = payload => store.dispatch({type: 'SET_ACCOUNT', payload});
export const updateAccount = payload => store.dispatch({type: 'UPDATE_ACCOUNT', payload: {...payload}});
export const removeAccount = () => store.dispatch({type: 'REMOVE_ACCOUNT'});