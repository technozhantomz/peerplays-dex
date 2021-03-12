import React from "react";
import {dbApi} from "../../nodes";
import {setPrecision} from "../../assets";
import {getUserHistory} from "../index";
import {roundNum} from "../../roundNum";
import {formDate} from "../../formDate";

export const getUserOrdersHistory = (pair, account) => {
    if(!account) return false;

    return getUserHistory({
        userID: account,
        filter: 4,
        callback: async history => {
            const {base, quote} = pair;

            const baseID = base.id;
            const quoteID = quote.id;
            const basePrecision = base.precision;
            const quotePrecision = quote.precision;

            history = history.filter(e => {
                const prices = e.op[1].fill_price;
                const orderAssets = [prices.base.asset_id, prices.quote.asset_id];
                return orderAssets.includes(baseID) && orderAssets.includes(quoteID);
            });

            if(!history.length) return false;

            const tableHead = [
                {
                    key: 'date',
                    translateTag: 'date'
                },
                {
                    key: 'quote',
                    translateTag: 'param',
                    translateParams: {
                        param: quote.symbol
                    },
                    params: 'align-right'
                },
                {
                    key: 'base',
                    translateTag: 'param',
                    translateParams: {
                        param: base.symbol
                    },
                    params: 'align-right'
                },
                {
                    key: 'price',
                    translateTag: 'price',
                    params: 'align-right'
                }
            ];

            const rows = await Promise.all(history.map(async item => {
                const date = await dbApi('get_block_header', [item.block_num])
                    .then(block => formDate(block.timestamp, ['date', 'month', 'year', 'time']));
                const opData = item.op[1];

                let quote = 0,
                    base = 0,
                    price = '';

                if(opData.receives.asset_id === quoteID){
                    quote = setPrecision(opData.receives.amount, quotePrecision);
                    base = setPrecision(opData.pays.amount, basePrecision);
                    price = <span className="clr--positive">{ roundNum(base / quote) }</span>
                } else {
                    quote = setPrecision(opData.pays.amount, quotePrecision);
                    base = setPrecision(opData.receives.amount, basePrecision);
                    price = <span className="clr--negative">{ roundNum(base / quote) }</span>
                }

                return { date, quote, base, price }
            }));

            return {rows, tableHead};
        }
    });
};