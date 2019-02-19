import {setPrecision} from "./setPrecision";
import {getAsset} from "./getAsset";
import {amountToString} from "./amountToString";

export const assetToString = async (asset) => {
    const {precision, symbol} = await getAsset(asset.asset_id);
    const precisionedValue = setPrecision(asset.amount, precision);
    return amountToString(precisionedValue, symbol);
};
