import {trxBuilder} from "./trxBuilder";
import {getLoginData} from "../store";

export const defaultTrx = async ({trx, password}) => {
    const result = {
        success: false
    };

    const activeKey = getLoginData().formPrivateKey(password, 'active');
    const trxResult = await trxBuilder([trx], [activeKey]);

    if(trxResult) result.success = true;

    return result;
};