import CloudAccount from "../../../classes/cloudAccount";
import {formAccount} from "../../account";

export const formCloudAccount = async data => {
    const accountData = await formAccount(data.name);
    const localData = {type: 'cloud', id: data.id, name: data.name};
    const loginData = new CloudAccount();

    return { accountData, localData, loginData };
};