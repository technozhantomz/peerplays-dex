import {store} from '../../index';

export const getStore = (param) => param ? store.getState()[param] : store.getState();

export const getAccountData = () => getStore('accountData');
export const getLoginData = () => getStore('loginData');
export const getInstance = () => getStore('instance');
export const getGlobals = () => getStore('globalData');
export const getBasicAsset = () => getGlobals().basicAsset;
export const getDefaultAsset = () => getGlobals().defaultAsset;
export const getFees = () => getGlobals().fees;