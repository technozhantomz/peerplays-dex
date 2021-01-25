import {PrivateKey, hash, key} from "peerplaysjs-lib";
import {getUserName} from "../../account/index";
import {generatePublic} from "../../keys";
import {dbApi} from "../../nodes/index";
import {cryptBrain, formWallet} from "../../wallet";
import {formLocalAccount} from "../createUser/formLocalAccount";
import {getInstance} from "../../store";

const getPubkeysFromBrain = async (brain, modificator, accsList = []) => {
    const privKey = PrivateKey.fromBuffer(hash.sha256(hash.sha512(brain + " " + modificator)));
    const pubKey = generatePublic(privKey);

    const fetchedUsers = await dbApi('get_key_references', [[pubKey]]).then(e => e[0]);

    if(!fetchedUsers.length) return {accsList, lastSequence: modificator};

    fetchedUsers.forEach(accID => !accsList.includes(accID) && accsList.push(accID));

    return getPubkeysFromBrain(brain, modificator + 1, accsList);
};

export const authByBrain = async (data, result) => {

    const {accsList, lastSequence} = await getPubkeysFromBrain(data.brainkey, 0);

    if(!accsList.length){
        result.errors.brainkey = 'wrongBrain';
    }

    const keyBuffer = key.get_random_key().toBuffer();
    const private_keys = [];

    for(let i = 0; i < lastSequence; i++) private_keys.push(cryptBrain(keyBuffer, data.brainkey, i));

    const wallet = formWallet(data.password, keyBuffer, data.brainkey, private_keys.length, data.publicName);

    const chain_id = getInstance().chain_id;

    const linked_accounts = await Promise.all(accsList.map(async userID => ({
        name: await getUserName(userID),
        chain_id
    })));

    const walletData = { linked_accounts, private_keys, wallet };
    const loginData = await formLocalAccount('', walletData);

    result.success = true;
    result.callbackData = {...loginData, remember: data.remember};

    return result;
};