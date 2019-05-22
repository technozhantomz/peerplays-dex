import {dictionary} from "../../../params/dictionary";
import {key} from "bitsharesjs";
import {cryptBrain, formWallet} from "../../wallet";
import {getInstance} from "../../store";

export const formLocalKeys = ({newLogin, password}, ) => {
    const keyBuffer = key.get_random_key().toBuffer();

    const brainKey = key.suggest_brain_key(dictionary.en);
    const normalizedBrain = key.normalize_brainKey(brainKey);

    const keys = {};
    const private_keys = [];

    ['active', 'owner', 'memo'].forEach((role, brainkey_sequence) => {
        const cryptedBrain = cryptBrain(keyBuffer, normalizedBrain, brainkey_sequence);
        private_keys.push(cryptedBrain);
        keys[role] = cryptedBrain.pubkey;
    });

    const wallet = formWallet(password, keyBuffer, normalizedBrain, private_keys.length);

    const linked_accounts = [{
        name: newLogin,
        chain_id: getInstance().chain_id
    }];

    const additionalData = { private_keys, wallet, linked_accounts };

    return {keys, additionalData}
};