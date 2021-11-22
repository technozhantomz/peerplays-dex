import {getStore} from "../store";
import {trxBuilder} from "./trxBuilder";
import {getDefaultFee} from "./getDefaultFee";
import { getSidechainAccounts } from '../account/getSidechainAccounts';

export const updateSidechainAddress = async (data, result) => {
    const {loginData, accountData} = getStore();
    const payer = accountData.id;
    const sidechain_address_id = data.sidechainAddressId;
    const sidechain = data.sidechain.toLowerCase();
    const deposit_public_key = data.depositPublicKey;
    const deposit_address = data.depositAddress;
    const deposit_address_data = data.depositAddressData
    const withdraw_public_key = data.withdrawPublicKey;
    const withdraw_address = data.withdrawAddress;

    const trx = {
        type: 'sidechain_address_update',
        params: {
            fee: getDefaultFee(),
            payer,
            sidechain_address_id,
            sidechain_address_account: payer,
            sidechain,
            deposit_public_key: '',
            deposit_address: '',
            deposit_address_data: '',
            withdraw_public_key,
            withdraw_address
        }
    };
    
    try {
        const activeKey = loginData.formPrivateKey(data.password, 'active');
        const trxResult = await trxBuilder([trx], [activeKey]);   
        if (trxResult) {
            result.success = true;
            result.callbackData = trxResult;
            result.sidechainAccounts = await getSidechainAccounts(payer);
        }
    } catch (error) {
        result.errors = "ERROR"
    }

    return result;
};