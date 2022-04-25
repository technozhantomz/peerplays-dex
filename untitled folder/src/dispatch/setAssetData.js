import {store} from "../index";

export const setAssetData = payload => store.dispatch({type: 'SET_PAGE', payload});
export const clearAssetData = payload => store.dispatch({type: 'CLEAR_PAGE'});