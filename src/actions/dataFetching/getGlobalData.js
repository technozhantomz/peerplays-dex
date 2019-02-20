import {ChainTypes} from "bitsharesjs";
import {formAccount} from "../account/formAccount";
import {dbApi} from "../nodes";

export const getGlobalData = async (account) => {
    let userData = false;

    if(account.id){
        userData = await formAccount(account.id, account.name);
    }

    const opTypes = ChainTypes.operations;
    const globalProps = await dbApi('get_global_properties');
    const feesParams = globalProps.parameters.current_fees.parameters;
    const fees = {};
    Object.keys(opTypes).forEach(el => {
        const fee = feesParams.find(fee => fee[0] === opTypes[el]);
        fees[el] = fee ? fee[1] : {};
    });

    return {userData, fees};
};