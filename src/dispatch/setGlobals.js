import {store} from "../index";

export const setGlobals = payload => store.dispatch({type: 'SET_GLOBALS', payload});