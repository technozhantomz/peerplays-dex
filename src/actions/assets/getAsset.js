import {dbApi} from "../nodes";
import {getCache, cacheOps} from "../cacheOps";

export const getAsset = async (id) => {
    const storedData = getCache('assets');
    if(storedData && storedData[id]) return storedData[id];

    const {precision, symbol} = await dbApi('get_assets', [[id]]).then(e => e[0]);
    cacheOps('assets', {[id]: {precision, symbol}});

    return {precision, symbol};
};