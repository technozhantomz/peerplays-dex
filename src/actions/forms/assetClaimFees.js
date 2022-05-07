import {trxBuilder} from "./trxBuilder";
import {getDefaultFee} from "./getDefaultFee";
import {getStore} from "../store";
import {formAssetData} from "../assets";

export const assetClaimFees = async (data, result) => {
    const {loginData, accountData} = getStore();
    const from = accountData.id;

    const asset = await formAssetData({symbol: data.mainAsset});

    const trx = {
        type: 'asset_claim_fees',
        params: {
            fee: getDefaultFee(),
            issuer: from,
            amount_to_claim: {
                amount: asset.addPresion(false, data.quantityAssetFees),
                asset_id: asset.id
            }
        }
    };

    const activeKey = loginData.formPrivateKey(data.password, 'active');
    const trxResult = await trxBuilder([trx], [activeKey]);

    if (trxResult) {
        result.success = true;
        result.callbackData = trxResult;
    }

    return result;
};