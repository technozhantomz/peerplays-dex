import {store} from '../index';
import {removeModal, setModal} from "../dispatch/modal";

export const initModal = (content) => {

    console.log('clicked', content);

    store.dispatch(setModal(content));
};

export const closeModal = () => {
    store.dispatch(removeModal());
};
