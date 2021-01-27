import PrivateKey from "bitsharesjs/es/ecc/src/PrivateKey";
import Account from "./account";
import {getAccountData} from "../actions/store";
import {getStoragedAccount} from "../actions/account";

class CloudAccount extends Account{
    checkPassword(password, account){
        if(!account) account = getAccountData();

        const login = account.name;
        const roles = ['active', 'owner', 'memo'];

        const keys = {
            active: account.active || account.keys.active,
            owner: account.owner || account.keys.owner,
            memo: account.options || account.keys.memo,
        };

        console.log('Password check keys = '+ JSON.stringify(keys));

        let result = false;
        let fromWif = '';

        try{ fromWif = PrivateKey.fromWif(password) }
        catch(e){ }


        fromWif? console.log('Supplied priv key = '+fromWif.toWif()) : console.log('normal seed password ' + password);

        for(let role of roles){
            const privKey = fromWif ? fromWif : PrivateKey.fromSeed(login + role + password);
            const pubKey = privKey.toPublicKey().toString();
            const key = role !== 'memo' ? keys[role].key_auths[0][0] : keys.memo.memo_key;
            console.log('pubkey generated = '+pubKey+' key = '+key);
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