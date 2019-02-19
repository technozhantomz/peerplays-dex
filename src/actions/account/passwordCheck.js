import PrivateKey from "bitsharesjs/es/ecc/src/PrivateKey";

export const passwordCheck = (account, password) => {
    const login = account.name;
    const roles = ['active', 'owner', 'memo'];

    let checkPassword = false;
    let fromWif = '';

    try{ fromWif = PrivateKey.fromWif(password) }
    catch(e){ }

    for(let role of roles){
        const privKey = fromWif ? fromWif : PrivateKey.fromSeed(login + role + password);
        const pubKey = privKey.toPublicKey().toString();
        const key = role !== 'memo' ? account[role].key_auths[0][0] : account.options.memo_key;

        if(key === pubKey){
            checkPassword = true;
            break;
        }
    }

    return checkPassword;
};