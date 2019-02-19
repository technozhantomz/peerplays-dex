import React from "react";
import Tbd from "../tbd";
import dataFetch from "../../helpers/dataFetch";
import {dbApi} from "../../../actions/nodes";
import {getAsset, setPrecision} from "../../../actions/assets";
import {defaultQuote, defaultToken} from "../../../params/networkParams";
import Table from "../../helpers/table";

const tableHead = [
    {
        key: 'asset',
        translateTag: 'asset'
    },
    {
        key: 'balance',
        translateTag: 'balance',
        params: 'align-right fit-content'
    },
    {
        key: 'debt',
        translateTag: 'debt',
        params: 'align-right fit-content'
    },
    {
        key: 'collateral',
        translateTag: 'collateral',
        translateParams: {
            token: defaultToken
        },
        params: 'align-right fit-content'
    },
    {
        key: 'ratio',
        translateTag: 'ratio',
        params: 'align-right fit-content'
    },
    {
        key: 'call',
        translateTag: 'callPrice',
        params: 'align-right fit-content'
    },
    {
        key: 'total',
        translateTag: 'total',
        translateParams: {
            token: defaultQuote
        },
        params: 'align-right fit-content'
    }
];

const getMargins = async (context) => {
    const userName = context.props.match.params.name;
    const acc = await dbApi('get_full_accounts', [[userName], false]).then(e => e[0][1]);
    return Promise.all(acc.call_orders.map(async order => {
        const {base, quote} = order.call_price;
        const baseAsset = await getAsset(base.asset_id);
        const quoteAsset = await getAsset(quote.asset_id);
        const collateral = setPrecision(order.collateral, baseAsset.precision);
        const actualBalance = acc.balances.find(el => el.asset_type === quote.asset_id).balance;
        const balance =  setPrecision(actualBalance, quoteAsset.precision);
        const baseAmount = setPrecision(base.amount, baseAsset.precision);
        const quoteAmount = setPrecision(quote.amount, quoteAsset.precision);

        let total = baseAmount;

        if(baseAsset.symbol !== defaultQuote){
            const tiker = await dbApi('get_ticker', [baseAsset.symbol, defaultQuote]).then(e => e.highest_bid);
            total = (baseAmount / tiker).toFixed(5);
        }

        return {
            asset: quoteAsset.symbol,
            balance,
            debt: quoteAmount,
            collateral,
            ratio: 0,
            call: (baseAmount / quoteAmount).toFixed(5),
            total
        }
    }));
};

const UserMargins = ({data}) => (
    <Table
        tableHead={tableHead}
        rows={data}
        link={{
            path: '/asset/',
            key: 'asset'
        }}
    />
);

export default dataFetch(getMargins)(UserMargins)