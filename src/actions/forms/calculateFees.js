import {TransactionHelper} from "peerplaysjs-lib";
import {setPrecision} from "../assets";
import {store} from '../../index';

const defaultNonce = TransactionHelper.unique_nonce_uint64();

const calculateFee = (fees, quantity, assetName, memo) => {
    const val = Number(quantity);

    const result = {
        feeErr: '',
        feeAmount: 0
    };

    if(!val){
        return result;
    } else if(isNaN(val)){
        result.feeErr = 'isNan';
        return result;
    } else if(Number(val) <= 0){
        result.feeErr = 'isNull';
        return result;
    }

    const account = store.getState().account;
    const rawFee = fees.fee;
    const rawAdditional = fees.price_per_kbyte;
    const actualAsset = account.assets.find(e => e.symbol === assetName);
    const precision = actualAsset.precision;
    const userBalance = setPrecision(actualAsset.quantity, precision);

    let feeAmount = setPrecision(rawFee, precision);

    if(memo && memo.length > 0){
        const memoLength = JSON.stringify(account.keys.memo).length;
        const helperLength = JSON.stringify(defaultNonce).length;
        const result = (memoLength + helperLength + memo.length) / 1024 * setPrecision(rawAdditional, precision);

        feeAmount = feeAmount + result;
    }

    result.feeAmount = feeAmount;

    if(userBalance < feeAmount + val){
        result.feeErr = 'isNotEnough';
        return result;
    }

    return result;
};

export const calculateSendFee = (fee, data) => calculateFee(fee, data.quantity, data.quantityAsset, data.memo);
export const calculateOrderFee = (fee, data) => calculateFee(fee, data.amount_to_sell, data.sellAsset);