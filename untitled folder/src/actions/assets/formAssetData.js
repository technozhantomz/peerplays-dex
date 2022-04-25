import {Asset} from "../../classes";
import {defaultQuote} from "../../params/networkParams";
import {getGlobals} from "../store";
import {getCache} from "../cacheOps";

export const formAssetData = async data => {
    const id = data.asset_type || data.asset_id || data.id;
    const symbol = data.symbol;
    const amount = data.balance || data.amount || 0;

    if(id && symbol && data.precision) return new Asset(data);

    const cacheData = getCache('assets');
    const {basicAsset, defaultAsset} = getGlobals();

    if(defaultAsset){
        const dataInCache = cacheData[id] || {};
        let assetFromRedux = '';
        if(dataInCache.symbol === basicAsset.symbol || symbol === basicAsset.symbol) assetFromRedux = basicAsset;
        if(dataInCache.symbol === defaultAsset.symbol || symbol === defaultAsset.symbol) assetFromRedux = defaultAsset;
        if(assetFromRedux) return new Asset({...assetFromRedux, amount})
    }

    if(id) return new Asset({id, amount}).getDataById();
    if(symbol) return new Asset({symbol, amount}).getDataBySymbol();

    return new Asset(data);
};