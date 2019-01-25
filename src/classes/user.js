import {decryptHex, generatePublic, seedToHex} from "../actions/keys";
import key from "bitsharesjs/es/ecc/src/KeyUtils";
import {addToDB, putToDB} from "../actions/iDB";

export class User{
    constructor({ pub_key = '', encrypt_key = '', active_wallet = 0 }){
        this.id = 0;
        this.pub_key = pub_key;
        this.encrypt_key = encrypt_key;
        this.active_wallet = active_wallet;
    }
    encrypt(password){
        //check variables and need of encrypt

        if(!password) return console.log('password needed!');

        //encrypting key

        const keyBuffer = key.get_random_key().toBuffer();
        const update = this.encrypt_key.length;

        this.pub_key = generatePublic(password);
        this.encrypt_key = seedToHex(password, keyBuffer);

        update
            ? putToDB('userData', this)
            : addToDB('userData', this);

        return keyBuffer;
    }
    checkPassword(password){
        //check password and pubkey
        if(!password) return console.log('password needed!');
        if(!this.pub_key) return console.log('user hasn\'t get pub key!');

        return generatePublic(password) === this.pub_key;
    }
    changeActiveWallet(id){
        this.active_wallet = id;
        putToDB('userData', this);
    }
    decryptBuffer(password){
        if(!password) return console.log('password needed!');
        if(!this.encrypt_key) return console.log('nothing to decrypt!');
        return decryptHex('buffer', password, this.encrypt_key);
    }
}
