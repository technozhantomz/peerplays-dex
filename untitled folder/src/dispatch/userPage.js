import {store} from "../index";

export const setUserPage = payload => store.dispatch({type: 'SET_PAGE', payload});
export const clearUserPage = () => store.dispatch({type: 'CLEAR_PAGE'});