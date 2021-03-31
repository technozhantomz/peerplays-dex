import {getStore} from "../store";
import {trxBuilder} from "./trxBuilder";
import {getDefaultFee} from "./getDefaultFee";
import { getSidechainAccounts } from '../account/getSidechainAccounts';

export const generateSidechainAddress = async (data, result) => {
    const {loginData, accountData} = getStore();
    const payer = accountData.id;

    const sidechain = data.sidechain.toLowerCase();
    const deposit_public_key = data.depositPublicKey;
    const withdraw_public_key = data.withdrawPublicKey;
    const withdraw_address = data.withdrawAddress;

    const trx = {
        type: 'sidechain_address_add',
        params: {
            fee: getDefaultFee(),
            payer,
            sidechain_address_account: payer,
            sidechain,
            deposit_public_key,
            deposit_address: '',
            deposit_address_data: '',
            withdraw_public_key,
            withdraw_address
        }
    };

    const activeKey = loginData.formPrivateKey(data.password, 'active');
    const trxResult = await trxBuilder([trx], [activeKey]);

    if (trxResult) {
        result.success = true;
        result.callbackData = trxResult;
        result.sidechainAccounts = await getSidechainAccounts(payer);
    }

    return result;
};