import {cacheOps, getCache} from "../cacheOps";
import {dbApi} from "../nodes";

export const getDynamicData = async id => {
    const storedData = getCache('assetDynamicData');
    if(storedData && storedData[id]) return storedData[id];
    const dynamicData = await dbApi('get_objects', [[id]]).then(e => e[0]);
    cacheOps('assetDynamicData', {[id]: dynamicData});
    return dynamicData;
};