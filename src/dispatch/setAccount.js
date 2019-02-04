import {store} from "../index";

export const setAccount = payload => store.dispatch({type: 'SET_ACCOUNT', payload})