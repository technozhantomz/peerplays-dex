import React from "react";
import ActionsBtn from "../../helpers/actionsBtn";
import {IconBuy, IconDeposit, IconSend} from "../../../svg/index";
import Table from "../../helpers/table";
import {connect} from "react-redux";
import {defaultQuote} from "../../../params/networkParams";
import {formAssetsList} from "../../../actions/assets/formAssetsList";
import dataFetch from "../../helpers/dataFetch";
import {dispatchSendModal} from "../../../actions/forms/dispatchSendModal";

const tableHead = [
    {
        key: 'asset',
        translateTag: 'asset'
    },
    {
        key: 'available',
        translateTag: 'available',
        params: 'align-right fit-content'
    },
    {
        key: 'price',
        translateTag: 'priceUSD',
        translateParams: {
            token: defaultQuote
        },
        params: 'align-right fit-content'
    },
    {
        key: 'change',
        translateTag: 'change',
    },
    {
        key: 'value',
        translateTag: 'valueUSD',
        translateParams: {
            token: defaultQuote
        },
        params: 'align-right'
    },
    {
        key: 'actions',
        translateTag: 'actions',
        params: 'align-right actions actions--long'
    }
];

const formAssets = (arr, isLoggedUser) => arr.map(el => {

    const asset = el.symbol;

    const defaultActions = <ActionsBtn
        actionsList={[
            <button>Reset Settings</button>,
            <button>Body 2</button>,
            <button>Body 2</button>
        ]}
    />;

    let additionalActions = '';

    if(isLoggedUser){
        additionalActions =
            <div className="actions__on-hover">
                <button onClick={() => dispatchSendModal(asset)}>
                    <IconSend />
                </button>
                <button>
                    <IconBuy />
                </button>
                <button>
                    <IconDeposit />
                </button>
            </div>
    }

    const actions = <div className="actions__wrapper">
        {additionalActions}
        {defaultActions}
    </div>;

    return {
        asset,
        available: el.quantity / (10 ** el.precision),
        price: el.usdPrice,
        change: el.dailyChange === "0" ? el.dailyChange : el.dailyChange > 0 ? `+${el.dailyChange}` : `-${el.dailyChange}`,
        value: Number((el.quantity / (10 ** el.precision) * el.usdPrice).toFixed(5)),
        actions
    }
});

const getUserAssets = async (context) => {
    const userName = context.props.match.params.name;
    const userAccount = context.props.account;

    let assets = [];
    let userLogged = false;

    if(userAccount && userAccount.name === userName){
        userLogged = true;
        assets = userAccount.assets;
    } else {
        assets = await formAssetsList(userName);
    }

    return formAssets(assets, userLogged);
};

const UserAssets = ({data}) => (
    <Table
        tableHead={tableHead}
        rows={data}
        link={{
            path: '/asset/',
            key: 'asset'
        }}
    />
);

const mapStateToProps = (state) => ({account: state.account});

const assetsComponent = dataFetch(getUserAssets)(UserAssets);

export default connect(mapStateToProps)(assetsComponent);