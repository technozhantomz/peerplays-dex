import {trxBuilder} from "./trxBuilder";
import {getLoginData} from "../store";

export const cancelOrder = async ({trx, password}) => {
    const result = {
        success: false
    };

    const activeKey = getLoginData().formPrivateKey(password, 'active');
    const trxResult = await trxBuilder([trx], [activeKey]);

    if(trxResult) result.success = true;

    return result;
};