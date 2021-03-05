import {store} from "../index";

export const setNotifications = payload => store.dispatch({type: 'SET_NOTIFICATIONS', payload});
export const removeNotifications = payload => store.dispatch({type: 'REMOVE_NOTIFICATIONS', payload});