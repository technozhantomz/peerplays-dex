import {generatePublic, seedToHex} from "../keys";
import {getInstance} from "../store";

export const formWallet = (password, keyBuffer, brainKey, brainkey_sequence, public_name = 'default') => {
    const created = new Date();
    const chain_id = getInstance().chain_id;

    return [{
        public_name,
        chain_id,
        created,
        brainkey_sequence,
        encryption_key: seedToHex(password, keyBuffer),
        encrypted_brainkey: seedToHex(keyBuffer, brainKey),
        id: public_name,
        last_modified: created,
        brainkey_backup_date: false,
        backup_date: false,
        brainkey_pubkey: generatePublic(brainKey),
        password_pubkey: generatePublic(password)
    }];
};