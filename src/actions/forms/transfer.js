import {TransactionHelper, Aes} from "peerplaysjs-lib";
import {dbApi} from "../nodes";
import {trxBuilder} from "./trxBuilder";
import {getStore} from "../store";
import {getDefaultFee} from "./getDefaultFee";

export const transfer = async (data, result) => {
console.log("call trasfer")
    if(data.to === data.from){
        result.errors['to'] = 'sendYourself';
        return result;
    }

    const to = await dbApi('get_account_by_name', [data.to]).then(e => e);

    if(!to){
        result.errors['to'] = 'noAcc';
        return result;
    }

    const {loginData, accountData} = getStore();
    const asset = accountData.assets.find(e => e.symbol === data.quantityAsset);
    const fromAccount = await dbApi('get_account_by_name',[accountData.name]);
    const from = accountData.id;

    const amount = {
        amount: data.quantity * (10 ** asset.precision),
        asset_id: asset.id
    };

    const fee = getDefaultFee();

    const trx = {
        type: 'transfer',
        params: { from, to: to.id, amount, fee }
    };

    const password = data.password;

    const activeKey = loginData.formPrivateKey(password, 'active');

    if(data.memo){
        let fromMemo;

        if(fromAccount.options.memo_key === fromAccount.active.key_auths[0][0]) {
            fromMemo = loginData.formPrivateKey(password, 'active');
        } else {
            fromMemo = loginData.formPrivateKey(password, 'memo');
        }

        const toMemo = to.options.memo_key;
        const nonce = TransactionHelper.unique_nonce_uint64();

        trx.params.memo = {
            from: fromMemo.toPublicKey().toPublicKeyString(),
            to: toMemo,
            nonce,
            message: Aes.encrypt_with_checksum(
                fromMemo,
                toMemo,
                nonce,
                data.memo
            ),
        };
    }

    const trxResult = await trxBuilder([trx], [activeKey]);

    if(trxResult){
        result.success = true;
        result.callbackData = trxResult;
    }

    return result;
};