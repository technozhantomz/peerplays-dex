import {trxBuilder} from "./trxBuilder";
import {PrivateKey} from "bitsharesjs";
import {getStorage} from "../storage";

export const updateAccount = async (params, password) => {
    const trx = {
        type: 'account_update',
        params
    };

    const login = getStorage('account').name;

    const activeKey = PrivateKey.fromSeed(login + 'owner' + password);

    return await trxBuilder([trx], [activeKey]);
};