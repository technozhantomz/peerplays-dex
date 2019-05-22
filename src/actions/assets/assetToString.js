import {setPrecision} from "./setPrecision";
import {getAssetById} from "./getAssetById";
import {amountToString} from "./amountToString";

export const assetToString = async (asset) => {
    const {precision, symbol} = await getAssetById(asset.asset_id);
    const precisionedValue = setPrecision(asset.amount, precision);
    return amountToString(precisionedValue, symbol);
};
