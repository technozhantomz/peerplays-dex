import {getBasicAsset} from "../store";

export const getDefaultFee = (asset_id = getBasicAsset().id) => ({amount: 0, asset_id});
