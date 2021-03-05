import PrivateKey from "peerplaysjs-lib";
import Aes from "peerplaysjs-lib";

export const generatePublic = (data) => {
    if(typeof(data) !== 'object'){
        data = PrivateKey.fromSeed(data);
    }

    return data.toPublicKey().toString()
};

export const seedToHex = (seed, data) => Aes.fromSeed(seed).encryptToHex(data);

const decryptionTypes = {
    buffer: 'decryptHexToBuffer',
    text: 'decryptHexToText'
};

export const decryptHex = (resultType, seed, hex) => {
    const decType = decryptionTypes[resultType];
    return Aes.fromSeed(seed)[decType](hex);
};