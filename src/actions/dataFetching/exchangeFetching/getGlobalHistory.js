import {formAssetData, setPrecision} from "../../assets";
import {historyApi} from "../../nodes";
import {roundNum} from "../../roundNum";
import {formDate} from "../../formDate";
import React from "react";
import {Asset} from "../../../classes";

export const getGlobalHistory = async ({base, quote}) => {
    const history = await historyApi('get_fill_order_history', [base.id, quote.id, 100]).then(item => {
        return item
    });

    const baseAsset = await formAssetData(base);
    const quoteAsset = await formAssetData(quote);

    if(!history.length) return [];

    const tableHead = [
        {
            key: 'time',
            translateTag: 'time'
        },
        {
            key: 'amount',
            translateTag: 'amountWithToken',
            translateParams: {
                token: quote.symbol
            },
        },
        {
            key: 'price',
            translateTag: 'priceWithToken',
            translateParams: {
                token: base.symbol
            },
        }
    ];

    const rows = await Promise.all(history.map(async el => {

        const time = formDate(el.time, ['date', 'month', 'year', 'time']);

        const {pays, receives} = el.op;

        let paysAmount = 0,
            amount = 0,
            price = "";

        if(pays.asset_id === baseAsset.id){
            paysAmount = baseAsset.setPrecision(false, pays.amount);
            amount = quoteAsset.setPrecision(false, receives.amount);
            price = <span className="clr--negative">{roundNum(paysAmount / amount)}</span>
        } else {
            paysAmount = baseAsset.setPrecision(false, receives.amount);
            amount = quoteAsset.setPrecision(false, pays.amount);
            price = <span className="clr--positive">{roundNum(paysAmount / amount)}</span>
        }

        return { time, amount, price };

    }));

    return {tableHead, rows};
};