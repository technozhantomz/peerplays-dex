import {PrivateKey,Login} from "peerplaysjs-lib";

export const passwordCheck = (account, password) => {
    const login = account.name;
    const roles = ['active', 'owner', 'memo'];

    let checkPassword = false;
    let fromWif = '';

    try{ fromWif = PrivateKey.fromWif(password) }
    catch(e){ }

    let keys = Login.generateKeys(login, password, roles);

    for(let role of roles){
        const privKey = fromWif ? fromWif : keys.privKeys[role];
        const pubKey = privKey.toPublicKey().toString();
        const key = role !== 'memo' ? account[role].key_auths[0][0] : account.options.memo_key;

        if(key === pubKey){
            checkPassword = true;
            break;
        }
    }

    return checkPassword;
};