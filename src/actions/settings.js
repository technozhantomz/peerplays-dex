import {defaultSettings} from "../params/storageData";
import {getStorage, setStorage} from "./storage";

export const initSettings = () => {
    if(!getStorage('settings').language){
        setStorage('settings', {...defaultSettings});
    }
};
