import {generatePublic, seedToHex} from "../keys";
import {hash} from "peerplaysjs-lib";
import PrivateKey from "peerplaysjs-lib";

export const cryptBrain = (keyBuffer, brainkey, brainkey_sequence) => {
    const private_key = PrivateKey.fromBuffer(hash.sha256(hash.sha512(brainkey + " " + brainkey_sequence)));

    return {
        brainkey_sequence,
        id: brainkey_sequence + 1,
        encrypted_key: seedToHex(keyBuffer, private_key.toBuffer()),
        pubkey: generatePublic(private_key),
    };
};