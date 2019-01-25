import key from "bitsharesjs/es/ecc/src/KeyUtils";
import {decryptHex, generatePublic, seedToHex} from "../actions/keys";
import {addToDB, putToDB} from "../actions/iDB";

export class Wallet{
    constructor({
        id = 0,
        public_name = '',
        encrypted_brainkey = '',
        brainkey_pubkey = '',
        sequence = '',
        created = '',
        modified = '',
        activity = 1
    }){
        this.id = id;
        this.public_name = public_name;
        this.encrypted_brainkey = encrypted_brainkey;
        this.brainkey_pubkey = brainkey_pubkey;
        this.sequence = sequence;
        this.created = created;
        this.modified = modified;
        this.activity = activity;
    }
    create(keyBuffer, name, brainkey, modifier = 0){
        if(!keyBuffer || !brainkey) return console.log('not all args!');
        if(this.created) return console.log('already encrypted!');

        brainkey = typeof(brainkey) === 'object' ? brainkey.join(' ') : brainkey;

        const brainWithModifier = key.normalize_brainKey(brainkey) + ' ' + modifier;

        this.id = modifier;
        this.public_name = name;
        this.brainkey_pubkey = generatePublic(brainWithModifier);
        this.encrypted_brainkey = seedToHex(keyBuffer, brainWithModifier);
        this.sequence = modifier;
        this.created = new Date().getTime();

        addToDB('wallets', this);
    }
    reEncrypt(oldBuffer, newBuffer){
        const brainWithModifier = decryptHex('text', oldBuffer, this.encrypted_brainkey);
        this.encrypted_brainkey = seedToHex(newBuffer, brainWithModifier);
        this.modify();
    }
    changeActivity(bool){
        this.activity = bool ? 1 : 0;
        this.modify();
    }
    modify(){
        this.modified = new Date().getTime();
        putToDB('wallets', this);
    }
    decrypt(keyBuffer){
        if(!keyBuffer) return console.log('keyBuffer needed!');
        if(!this.encrypted_brainkey) return console.log('nothing to decrypt!');

        const brainWithModifier = decryptHex('text', keyBuffer, this.encrypted_brainkey);
        return brainWithModifier.split(' ').splice(0, 12).join(' ');
    }
}