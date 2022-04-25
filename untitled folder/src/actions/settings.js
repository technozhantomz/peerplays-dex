import {defaultSettings} from "../params/storageData";
import {getStorage, setStorage} from "./storage";
import {defaultExchanges} from "../params/defaultExchanges";

export const initSettings = () => {
    if(!getStorage('settings').language) setStorage('settings', {...defaultSettings});
    if(!getStorage('exchanges').active) setStorage('exchanges', {...defaultExchanges});
};
