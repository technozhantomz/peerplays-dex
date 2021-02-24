import {formKeys} from "./formKeys";
import {faucetUrl} from "../../../params/networkParams";
import {formAccountData} from "./formAccountData";

export const createUser = async (data, result) => {
    const type = data.type ? data.type : 'cloud';

    const {keys, additionalData} = formKeys[type](data);

    const account = {
        name: data.newLogin,
        active_key: keys.active,
        memo_key: keys.memo,
        owner_key: keys.owner,
        refcode: null,
        referrer: data.referrer || null
    };

    const newUserData = await fetch(faucetUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({account})
    }).then(e => e.json());

    if(newUserData.account){
        result.success = true;
        result.callbackData = await formAccountData[type](newUserData.account, additionalData);
    }

    return result;
};