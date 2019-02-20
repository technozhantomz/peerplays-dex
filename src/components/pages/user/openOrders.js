import React from "react";
import {store} from "../../../index";
import ActionsBtn from "../../helpers/actionsBtn";
import Table from "../../helpers/table";
import {dbApi} from "../../../actions/nodes/index";
import {amountToString, getAsset, setPrecision} from "../../../actions/assets/index";
import dataFetch from "../../helpers/dataFetch";
import {getStorage} from "../../../actions/storage";
import {cancelOrder, getPassword} from "../../../actions/forms";
import {removeModal, setModal} from "../../../dispatch/setModal";
import WarningModal from "../../helpers/modal/warningModal";
import {defaultToken} from "../../../params/networkParams";
import {roundNum} from "../../../actions/roundNum";

const tableHead = [
    {
        key: 'trade',
        translateTag: 'trade'
    },
    {
        key: 'order',
        translateTag: 'orderID',
        params: 'fit-content align-right'
    },
    {
        key: 'description',
        translateTag: 'description',
        params: 'fit-content align-right'
    },
    {
        key: 'price',
        translateTag: 'price',
        params: 'fit-content align-right'
    },
    {
        key: 'market',
        translateTag: 'marketPrice',
        params: 'fit-content align-right'
    },
    {
        key: 'value',
        translateTag: 'value',
        params: 'fit-content align-right'
    },
    {
        key: 'actions',
        params: 'actions fit-content align-right'
    }
];

const openWarning = async (order, resetFunc) => {

    const reRender = () => {
        removeModal();
        resetFunc();
    };

    return getPassword(async password => {
        const assetId = order.sell_price.base.asset_id;

        const params = {
            fee: {amount: 0, asset_id: assetId},
            fee_paying_account: getStorage('account').id,
            order: order.id,
            extensions: []
        };

        const data = { params, password };
        const fee = store.getState().globalData.fees.limit_order_cancel.fee;
        const feeAsset = await getAsset(assetId);
        const text = `For this operation you\'ll have to pay ${fee} ${feeAsset.symbol} fee. Do you want to continue?`;

        setModal(<WarningModal data={data} method={cancelOrder} text={text} onSuccess={reRender} />)
    });
};

export const getOrders = (context) => {
    const name = context.props.match.params.name;
    return dbApi('get_full_accounts', [[name], false])
        .then(e => e[0][1].limit_orders)
        .then(orders => {
            return Promise.all(orders.map(async el => {

                const {base, quote} = el.sell_price;
                const baseAsset = await getAsset(base.asset_id);
                const quoteAsset = await getAsset(quote.asset_id);
                const marketPrice = await dbApi('get_ticker', [baseAsset.symbol, quoteAsset.symbol]).then(e => e.latest);
                const price = setPrecision(base.amount, baseAsset.precision) / setPrecision(quote.amount, quoteAsset.precision);
                const forSale = setPrecision(el.for_sale, baseAsset.precision);
                const quoteAmount = forSale / price;

                let value = 1;

                if(baseAsset.symbol !== defaultToken){
                    value = await dbApi('get_ticker', [baseAsset.symbol, defaultToken]).then(e => e.latest);
                }

                return {
                    trade: baseAsset.symbol,
                    order: el.id.substr(el.id.lastIndexOf('.') + 1, ),
                    description: `Buy ${amountToString(quoteAmount, quoteAsset.symbol)} for ${amountToString(forSale, baseAsset.symbol)}`,
                    price: `${roundNum(price)} ${baseAsset.symbol}`,
                    market: marketPrice > 0 ? `${roundNum(marketPrice)} ${quoteAsset.symbol}` : 'n/a',
                    value: `${roundNum(value, 0)} ${defaultToken}`,
                    actions: <div className="actions__wrapper">
                        <ActionsBtn
                            actionsList={[
                                <button onClick={() => openWarning(el, context.reset)}>Cancel Order</button>
                            ]}
                        />
                    </div>
                }
            }));
        });
};

const OpenOrders = ({data}) => <Table tableHead={tableHead} rows={data} />;

export default dataFetch(getOrders, 'userOrders')(OpenOrders);