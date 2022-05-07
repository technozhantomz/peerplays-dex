import {cacheOps, getCache} from "../cacheOps";
import {dbApi} from "../nodes";

export const getAssetBySymbol = async symbol => {
    const storedData = getCache('assets');

    let data = false;

    for(let id in storedData){
        const item = storedData[id];

        if(item.symbol === symbol){
            data = { id, precision: item.precision };
            break;
        }
    }

    if(data) return data;

    const {precision, id} = await dbApi('lookup_asset_symbols', [[symbol]]).then(e => e[0]);
    cacheOps('assets', {[id]: {precision, symbol}});

    return {precision, id};
};