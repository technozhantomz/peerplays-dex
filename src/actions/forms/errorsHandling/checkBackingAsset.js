import {dbApi} from "../../nodes";

export const checkBackingAsset = async ({smartCoin, predictionMarket, decimal, backingAsset}) => {
    if(!backingAsset) return;

    const assetData = await dbApi('lookup_asset_symbols', [[backingAsset], 1]).then(e => e[0]);

    if(!assetData || assetData.symbol !== backingAsset) return 'wrongAsset';
    if(!smartCoin || !predictionMarket) return '';

    return Number(decimal) !== assetData.precision ? 'needSamePrecision' : false;
};