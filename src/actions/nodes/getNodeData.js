import {defaultNetwork, defaultToken, defaultChainParams} from "../../params/networkParams";
import {store} from "../../index";

// ChainConfig.setPrefix(defaultToken);
// ChainConfig.networks[defaultNetwork] = defaultChainParams;

const getData = type => (request, data = []) => store.getState().instance[type].exec(request, data);

export const dbApi = getData('_db');
export const historyApi = getData('_hist');
