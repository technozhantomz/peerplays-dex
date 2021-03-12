import {getStorage, setStorage} from "./storage/index";
import {getPassedTime} from "./getPassedTime";

export const initCache = () => {
    const cache = getStorage('cache');
    if(!cache.created || getPassedTime(cache.created) > 24 * 60 * 60 * 1000) setStorage('cache', {created: new Date().getTime()});
};

export const getCache = type => getStorage('cache')[type];
export const cacheOps = (type, data) => {
    const oldData = getStorage('cache');
    oldData[type] = {...oldData[type], ...data};
    setStorage('cache', oldData);
};
