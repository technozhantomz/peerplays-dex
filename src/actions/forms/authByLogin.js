import {formAccount} from "../account/formAccount";
import {dbApi} from "../nodes";
import {passwordCheck} from "../account";

export const authByLogin = async ({login, password}, result) => {
    const fullAcc = await dbApi('get_full_accounts', [[login], false])
        .then(arr => arr[0][1])
        .catch(() => false);

    if(!fullAcc){
        result.errors.login = 'noAcc';
        return result;
    }

    const accData = fullAcc.account;
    const checkPassword = passwordCheck(accData, password);

    if(!checkPassword){
        result.errors.password = 'wrongPass';
        return result;
    }

    result.success = true;
    result.callbackData = await formAccount(accData.id, login, fullAcc.balances);

    return result;
};