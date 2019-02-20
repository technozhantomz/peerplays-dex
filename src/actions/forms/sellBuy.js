import {trxBuilder} from "./trxBuilder";
import {PrivateKey} from "bitsharesjs";
import {store} from '../../index.js';

export const sellBuy = async (data, result) => {
    if (data.sellAsset === data.buyAsset) {
        result.errors['buyAsset'] = 'sameAsset';
        result.errors['sellAsset'] = 'sameAsset';
        return result;
    }

    const userData = store.getState().account;
    const sellAsset = userData.assets.find(e => e.symbol === data.sellAsset);
    const buyAsset = userData.assets.find(e => e.symbol === data.buyAsset);
    const seller = userData.id;

    const amount_to_sell = {
        amount: data.amount_to_sell * (10 ** sellAsset.precision),
        asset_id: sellAsset.id
    };

    const min_to_receive = {
        amount: data.amount_to_receive * (10 ** buyAsset.precision),
        asset_id: buyAsset.id
    };

    const fee = {
        amount: 0,
        asset_id: sellAsset.id
    };

    const time_point_sec = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365).toISOString();

    const trx = {
        type: 'limit_order_create',
        params: {
            fee,
            seller,
            amount_to_sell,
            min_to_receive,
            expiration: time_point_sec,
            fill_or_kill: false,
            extensions: []
        }
    };

    const login = userData.name;
    const password = data.password;

    const activeKey = PrivateKey.fromSeed(login + 'active' + password);

    const trxResult = await trxBuilder([trx], [activeKey]);

    if(trxResult){
        result.success = true;
        result.callbackData = trxResult;
    }

    return result;
};