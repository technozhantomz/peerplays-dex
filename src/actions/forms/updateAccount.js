import {trxBuilder} from "./trxBuilder";
import {getStore} from "../store";
import {getDefaultFee} from "./getDefaultFee";

export const updateAccount = async (newData, password) => {

    const {accountData, loginData} = getStore();

    const trx = {
        type: 'account_update',
        params: {
            ...newData,
            account: accountData.id,
            fee: getDefaultFee()
        }
    };

    const activeKey = loginData.formPrivateKey(password, 'active');

    return await trxBuilder([trx], [activeKey]);
};