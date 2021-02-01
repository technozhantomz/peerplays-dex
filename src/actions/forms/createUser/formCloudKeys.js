import {PrivateKey} from "peerplaysjs-lib";

export const formCloudKeys = ({newLogin, password}) => {
    const keys = {};
    const roles = ['active', 'owner', 'memo'];

    for(let role of roles){
        const privKey = PrivateKey.fromSeed(newLogin + role + password);
        keys[role] = privKey.toPublicKey().toString();
    }

    return {keys};
};