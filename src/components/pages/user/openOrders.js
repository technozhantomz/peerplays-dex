import React from "react";
import ActionsBtn from "../../helpers/actionsBtn";
import Table from "../../helpers/table";
import {dbApi} from "../../../actions/nodes/index";
import {amountToString, getAsset, setPrecision} from "../../../actions/assets/index";
import dataFetch from "../../helpers/dataFetch";

const tableHead = [
    {
        key: 'trade',
        translateTag: 'trade'
    },
    {
        key: 'order',
        translateTag: 'orderID',
        params: 'fit-content'
    },
    {
        key: 'description',
        translateTag: 'description',
    },
    {
        key: 'price',
        translateTag: 'price',
        params: 'fit-content'
    },
    {
        key: 'market',
        translateTag: 'marketPrice',
        params: 'fit-content'
    },
    {
        key: 'value',
        translateTag: 'value',
    },
    {
        key: 'actions',
        params: 'actions'
    }
];

export const getOrders = (context) => {
    const name = context.props.match.params.name;
    return dbApi('get_full_accounts', [[name], false])
        .then(e => e[0][1].limit_orders)
        .then(orders => {
            // console.log('ordersList', orders);
            return Promise.all(orders.map(async el => {
                // console.log(el);
                const {base, quote} = el.sell_price;
                const baseAsset = await getAsset(base.asset_id);
                const quoteAsset = await getAsset(quote.asset_id);
                const marketPrice = await dbApi('get_ticker', [baseAsset.symbol, quoteAsset.symbol]).then(e => e.latest);
                const basePrice = setPrecision(base.amount, baseAsset.precision);
                const quotePrice = setPrecision(quote.amount, quoteAsset.precision);

                return {
                    trade: baseAsset.symbol,
                    order: el.id.substr(el.id.lastIndexOf('.') + 1, ),
                    description: `Buy ${amountToString(quotePrice, quoteAsset.symbol)} for ${amountToString(basePrice, baseAsset.symbol)}`,
                    price: basePrice,
                    market: marketPrice,
                    value: 'ХХХ,ХХХ.ХХХХХХХ',
                    actions: <div className="actions__wrapper">
                        <ActionsBtn
                            actionsList={[
                                <button>Reset Settings</button>,
                                <button>Body 2</button>,
                                <button>Body 2</button>
                            ]}
                        />
                    </div>
                }
            }));
        });
};

const OpenOrders = ({data}) => <Table tableHead={tableHead} rows={data} />;

export default dataFetch(getOrders, 'userOrders')(OpenOrders);