import Aes from "bitsharesjs/es/ecc/src/aes";
import {store} from '../../index';
import {PrivateKey, TransactionHelper} from "bitsharesjs";
import {dbApi} from "../nodes";
import {trxBuilder} from "./trxBuilder";

export const transfer = async (data, result) => {

    if(data.to === data.from){
        result.errors['to'] = 'sendYourself';
        return result;
    }

    const to = await dbApi('get_account_by_name', [data.to]).then(e => e);

    if(!to){
        result.errors['to'] = 'noAcc';
        return result;
    }

    const userData = store.getState().account;
    const asset = userData.assets.find(e => e.symbol === data.quantityAsset);
    const from = userData.id;

    const amount = {
        amount: data.quantity * (10 ** asset.precision),
        asset_id: asset.id
    };
    const fee = {
        amount: 0,
        asset_id: asset.id
    };

    const trx = {
        type: 'transfer',
        params: { from, to: to.id, amount, fee }
    };

    const login = userData.name;
    const password = data.password;

    const activeKey = PrivateKey.fromSeed(login + 'active' + password);

    if(data.memo){

        const fromMemo = PrivateKey.fromSeed(login + 'memo' + password);
        const toMemo = to.options.memo_key;
        const nonce = TransactionHelper.unique_nonce_uint64();

        trx.params['memo'] = {
            from: fromMemo.toPublicKey().toString(),
            to: toMemo,
            nonce,
            message: Aes.encrypt_with_checksum(
                activeKey,
                toMemo,
                nonce,
                new Buffer(data.memo)
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