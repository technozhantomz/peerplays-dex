import {setAssetData} from "../../dispatch";
import {setPermissions} from "../assets/setPermissions";
import {getStore} from "../store";
import {dbApi} from "../nodes";

export const fetchAssetData = async (context) => {
    let assetSymbol = context
        ? context.props.match.params.symbol
        : getStore().pageData.basicData.symbol;

    const assetData = await dbApi('lookup_asset_symbols', [[assetSymbol]]).then(async (assetList) => {
        const asset = assetList[0];
        const {bitasset_data_id, dynamic_asset_data_id} = asset;

        const flags = setPermissions(asset.options.flags, bitasset_data_id);
        const permissions = setPermissions(asset.options.issuer_permissions, bitasset_data_id);

        let idsArray = [dynamic_asset_data_id];

        if (bitasset_data_id) idsArray.push(bitasset_data_id);

        const [dynamicData, smartData] = await dbApi('get_objects', [idsArray]).then(e => e);

        return { basicData: asset, dynamicData, smartData, permissions, flags };
    });

    setAssetData(assetData);

    return {data: true}
};