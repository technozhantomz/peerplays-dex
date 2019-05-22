import {formKeys} from "./formKeys";
import {testnetCheck} from "../../../params/networkParams";
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

    const userCreationURL = testnetCheck ? 'https://faucet.testnet.bitshares.eu/api/v1/accounts' : 'https://faucet.testnet.bitshares.eu/api/v1/accounts';

    const newUserData = await fetch(userCreationURL, {
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