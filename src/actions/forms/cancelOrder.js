import {store} from "../../index";
import {trxBuilder} from "./trxBuilder";
import PrivateKey from "bitsharesjs/es/ecc/src/PrivateKey";

export const cancelOrder = async ({params, password}) => {
    const result = {
        success: false
    };

    const trx = {
        type: 'limit_order_cancel',
        params
    };

    const login = store.getState().account.name;

    const activeKey = PrivateKey.fromSeed(login + 'active' + password);
    const trxResult = await trxBuilder([trx], [activeKey]);

    if(trxResult) result.success = true;

    return result;
};