import {getStore} from "../store";
import {trxBuilder} from "./trxBuilder";
import {getDefaultFee} from "./getDefaultFee";
import {dbApi} from "../nodes";
import {formAssetData} from "../assets";

export const assetUpdateIssuer = async (data, result) => {
    const {loginData, accountData, pageData} = getStore();
    const issuer = accountData.id;

    const asset_to_update = await formAssetData({symbol: data.mainAsset}).then(e => e.id);
    const new_options = pageData.basicData.options;
    const new_issuer = await dbApi('get_account_by_name', [data.assetOwner]).then(e => e.id);

    const trx = {
        type: 'asset_update',
        params: {
            fee: getDefaultFee(),
            issuer,
            new_issuer,
            asset_to_update,
            new_options
        }
    };

    const activeKey = loginData.formPrivateKey(data.password, 'owner');
    const trxResult = await trxBuilder([trx], [activeKey]);

    if (trxResult) {
        result.success = true;
        result.callbackData = trxResult;
    }

    return result;
};