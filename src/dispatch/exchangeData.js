import {fetchExchangeData, unsubscribeFromMarket} from "../actions/dataFetching/exchangeFetching";
import {store} from '../index';
import {getStorage} from "../actions/storage";

const getPair = () => getStorage('exchanges').active;

export const loadExchangeData = async (pair = getPair()) => {
    const payload = await fetchExchangeData(pair);
    store.dispatch({type: 'SET_PAGE', payload});
};

export const updateExchangeFields = payload => store.dispatch({type: 'UPDATE_PAGE', payload});
export const clearExchangeData = () => unsubscribeFromMarket().then(() => store.dispatch({type: 'CLEAR_PAGE'}));