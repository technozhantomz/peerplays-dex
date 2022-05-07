import {formAccount} from "../../account/formAccount";
import {getFullAccount} from "../../account/getFullAccount";
import CloudAccount from "../../../classes/cloudAccount";

export const authByLogin = async ({login, password, remember}, result) => {
    const fullAcc = await getFullAccount(login, true);

    if(!fullAcc){
        result.errors.login = 'noAcc';
        return result;
    }

    const accData = fullAcc.account;
    const loginData = new CloudAccount();
    const checkPassword = loginData.checkPassword(password, accData);

    if(!checkPassword){
        result.errors.password = 'wrongPass';
        return result;
    }

    const localData = {type: 'cloud', id: fullAcc.account.id, name: fullAcc.account.name};
    const accountData = await formAccount(fullAcc);

    result.success = true;
    result.callbackData = { loginData, accountData, localData, remember };

    return result;
};