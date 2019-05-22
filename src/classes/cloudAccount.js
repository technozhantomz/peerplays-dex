import {PrivateKey} from "bitsharesjs";
import Account from "./account";
import {getAccountData} from "../actions/store";
import {getStoragedAccount} from "../actions/account";

class CloudAccount extends Account{
    checkPassword(password, account){

        if(!account) account = getAccountData();

        const login = account.name;
        const roles = ['active', 'owner', 'memo'];

        // console.log(account);

        const keys = {
            active: account.active || account.keys.active,
            owner: account.owner || account.keys.owner,
            memo: account.options || account.keys.memo,
        };

        let result = false;
        let fromWif = '';

        try{ fromWif = PrivateKey.fromWif(password) }
        catch(e){ }

        for(let role of roles){
            const privKey = fromWif ? fromWif : PrivateKey.fromSeed(login + role + password);
            const pubKey = privKey.toPublicKey().toString();
            const key = role !== 'memo' ? keys[role].key_auths[0][0] : keys.memo.memo_key;

            if(key === pubKey){
                result = true;
                break;
            }
        }

        if(result) this.savePassword(password);

        return result;
    }
    formPrivateKey(password = this.password, role){
        let fromWif = '';

        try{ fromWif = PrivateKey.fromWif(password) }
        catch(e){ }

        return fromWif ? fromWif : PrivateKey.fromSeed(getStoragedAccount().name + role + password);
    }
}

export default CloudAccount;