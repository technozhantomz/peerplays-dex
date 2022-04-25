import {store} from "../index";

export const setVotes = payload => store.dispatch({type: 'SET_VOTES', payload});
export const clearVotes = () => store.dispatch({type: 'CLEAR_VOTES'});