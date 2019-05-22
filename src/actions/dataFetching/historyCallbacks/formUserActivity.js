import React from "react";
import {ChainTypes} from "bitsharesjs";
import {getUserName} from "../../account/getUserName";
import {formAssetData} from "../../assets";
import {dbApi} from "../../nodes";
import {Link} from "react-router-dom";
import {formDate} from "../../formDate";
import Translate from "react-translate-component";
import TransactionModal from "../../../components/helpers/modal/content/transanctionModal";
import {setModal} from "../../../dispatch";
import {getBasicAsset} from "../../store";

export const formUserActivity = context => {
    const user = context.props.data.id;
    const history = context.props.data.history;

    if (!history.length) return [];

    return Promise.all(history.map(async el => {
        const fee = el.op[1].fee;

        const time = await dbApi('get_block_header', [el.block_num]).then(block => formDate(block.timestamp));
        const {type, info} = await formInfoColumn(user, el);
        const feeAsset = await formAssetData(fee);

        return {
            id: el.id,
            fee: feeAsset.toString(),
            type,
            info,
            time
        };
    }));
};

const formInfoColumn = async (user, operation) => {
    const {type, data} = await formTrxInfo(user, operation);
    const basicTag = `tableInfo.${type}`;
    return {
        type: <Translate content={`${basicTag}.title`} component="a"
                         onClick={() => setModal(<TransactionModal user={user} blockNum={operation.block_num}
                                                                   opNum={operation.op_in_trx}/>)}
                         className="operation positive"/>,
        info: <Translate content={`${basicTag}.description`} with={data}/>
    };
};

export const formTrxInfo = async (user, operation, notification = false) => {
    const operationsIndexes = Object.values(ChainTypes.operations);
    const operationsNames = Object.keys(ChainTypes.operations);

    let type = operationsNames[operationsIndexes.indexOf(operation.op[0])].toLowerCase();

    const opData = operation.op[1];
    const opResult = operation.result[1];

    if (!formAdditionalInfo[type]) return '';

    const data = await formAdditionalInfo[type](notification, opData, opResult);

    if (type === 'transfer') type = opData.from === user ? 'send' : 'receive';

    return {type, data}
};

const formAdditionalInfo = {
    'account_create': async (notification, {registrar, name}) => {
        return {
            author: await getAuthor(registrar),
            registrar: await formUserData(registrar, notification),
            user: await formUserData(name, notification)
        }
    },
    'account_upgrade': async (notification, {account_to_upgrade}) => ({
        user: await formUserData(account_to_upgrade, notification)
    }),
    'worker_create': async (notification, {owner, daily_pay}) => ({
        user: await formUserData(owner, notification),
        dailyPay: getBasicAsset().toString(daily_pay)
    }),
    'account_update': async (notification, {account}) => ({
        author: await getAuthor(account),
        user: await formUserData(account, notification)
    }),
    'transfer': async (notification, {from, to, amount}) => {

        const amountAsset = await formAssetData(amount);

        return {
            author: await getAuthor(from),
            sender: await formUserData(from, notification),
            receiver: await formUserData(to, notification),
            quantity: amountAsset.toString()
        };
    },
    'limit_order_cancel': async (notification, {fee_paying_account, order}) => ({
        id: order.split('.')[2],
        author: await getAuthor(fee_paying_account),
        user: await formUserData(fee_paying_account, notification),
    }),
    'limit_order_create': async (notification, {seller, min_to_receive, amount_to_sell}, id) => {

        const buyAsset = await formAssetData(min_to_receive);
        const sellAsset = await formAssetData(amount_to_sell);

        return {
            id: id.split('.')[2],
            author: await getAuthor(seller),
            creator: await formUserData(seller, notification),
            buy: buyAsset.toString(),
            sell: sellAsset.toString(),
            marketLink: formLink('exchange', `market`, `${buyAsset.symbol}_${sellAsset.symbol}`)
        };
    },
    "fill_order": async (notification, {receives, pays, order_id, account_id}) => {

        const buyAsset = await formAssetData(receives);
        const sellAsset = await formAssetData(pays);

        return {
            author: await getAuthor(account_id),
            id: order_id.split('.')[2],
            user: await formUserData(account_id, notification),
            pays: buyAsset.toString(),
            receives: sellAsset.toString(),
            marketLink: notification ? 'market' : formLink('exchange', `market`, `${buyAsset.symbol}_${sellAsset.symbol}`)
        }
    },
    "asset_fund_fee_pool": async (notification, {from_account, asset_id, amount}) => {
        const asset = await formAssetData({asset_id, amount});

        return {
            from: await formUserData(from_account, notification),
            symbol: asset.symbol,
            amount: asset.toString()
        }
    },
    "account_whitelist": async (notification, {account_to_list, authorizing_account, new_listing}) => {
        const statuses = {
            0: 'unlisted',
            1: 'whitelisted',
            2: 'blacklisted'
        };

        return{
            issuer: await formUserData(account_to_list, notification),
            listed: await formUserData(authorizing_account, notification),
            status: statuses[new_listing]
        }
    },
    "asset_create": async (notification, {symbol, issuer}) => ({
        issuer: await formUserData(issuer, notification),
        assetName: notification ? symbol : formLink('asset', symbol),
    }),
    "asset_issue": async (notification, {asset_to_issue, issue_to_account, issuer}) => {
        const asset = await formAssetData(asset_to_issue);

        return{
            issuer: await formUserData(issuer, notification),
            receiver: await formUserData(issue_to_account, notification),
            assetAmount: asset.toString()
        }
    },
    "asset_update": async (notification, {issuer, asset_to_update}) => {
        const asset = await formAssetData({asset_id: asset_to_update});

        return{
            issuer: await formUserData(issuer, notification),
            asset: notification ? asset.symbol : formLink('asset', asset.symbol),
        }
    },
};

const getAuthor = userID => getUserName(userID);
const formLink = (url, text, linkID) => <Link to={`/${url}/${linkID || text}`}>{text}</Link>;
const formUserData = async (userID, notification) => {
    const userName = await getUserName(userID);
    return notification ? userName : formLink('user', userName);
}
