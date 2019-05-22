import {dbApi} from "../../nodes";

export const getPairData = async (param) => {
    let assets = param.split('_');
    const [quote, base] = await dbApi('lookup_asset_symbols', [assets])
        .then(assets => assets.map(({bitasset_data_id, dynamic_asset_data_id, id, symbol, precision}) => (
            {bitasset_data_id, dynamic_asset_data_id, id, symbol, precision}
        )));
    return {base, quote}
};