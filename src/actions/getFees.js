import React from "react";
import {dbApi} from "./nodes";
import {ChainTypes} from "bitsharesjs"
import {setAssets} from "./setAssets";

export const getFees = async () => {
    let globalProps = {},
        operations = [];

    const operationsNames = Object.keys(ChainTypes.operations);

    globalProps = await dbApi('get_global_properties').then(e => e['parameters']['current_fees']['parameters']);

    operations = operationsNames.map((item, index) => ({
        name: item.split('_').join(' ').toUpperCase(),
        ...globalProps[index]
    }));

    operations = operations.map(async (item) => {
        if('1' in item) {
            return {
                fee: 'fee' in item[1] ? await setAssets({quantity: Number(item[1]['fee']), asset: '1.3.0'}) : '',
                membership_lifetime_fee: 'membership_lifetime_fee' in item[1] ? await setAssets({
                    quantity: Number(item[1]['membership_lifetime_fee']),
                    asset: '1.3.0'
                }) : '',
                price_per_kbyte: 'price_per_kbyte' in item[1] ? await setAssets({
                    quantity: Number(item[1]['price_per_kbyte']),
                    asset: '1.3.0'
                }) : '',
                name: <span className="operation negative">{item['name']}</span>
            }
        } else {
            return {
                fee: '',
                membership_lifetime_fee: '',
                price_per_kbyte: '',
                name: <span className="operation negative">{item['name']}</span>
            }
        }
    });

    operations = await Promise.all(operations);

    return operations;
};