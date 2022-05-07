import {store} from '../index';

export const setModal = payload => {
    [
        {type: 'SET_MODAL', payload},
        {type: 'SET_OVERLAY', payload: 'MODAL'}
    ].forEach(action => store.dispatch(action));
};

export const removeModal = () => {
    [
        {type: 'CLOSE_MODAL'},
        {type: 'REMOVE_OVERLAY'}
    ].forEach(action => store.dispatch(action))
};