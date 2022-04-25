import {Login} from "peerplaysjs-lib";

export const formCloudKeys = ({newLogin, password}) => {
    const keys = {};
    const roles = ['active', 'owner', 'memo'];

    const generatedKeys = Login.generateKeys(newLogin, password, roles);

    for(let role of roles){
        keys[role] = generatedKeys.pubKeys[role].toString();
    }

    return {keys};
};