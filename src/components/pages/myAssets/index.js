import React, {Component} from 'react';
import AssetsPermissions from "./assetsPermissions";
import PageMenu from "../../helpers/pageMenu";
import QuantityConverter from "../../helpers/quantityConverter";
import {connect} from "react-redux";
import UserAssets from "../user/userAssets";
import OpenOrders from "../user/openOrders";
import UserActivity from "../user/userActivity";
import UserMargins from "../user/userMargins";
import NeedToLogin from "../../helpers/needToLogin";
import AssetsDeposit from "./assetsDeposit";
import AssetWithdraw from "./assetsWithdraw";

const basicMenu = [
    {
        link: '/',
        tag: 'userAssets',
        component: UserAssets
    },
    {
        link: '/orders/',
        tag: 'orders',
        component: OpenOrders
    },
    {
        link: '/activity',
        tag: 'activity',
        component: UserActivity
    },
    {
        link: '/positions',
        tag: 'positions',
        component: UserMargins
    },
    {
        link: '/permissions',
        tag: 'permissions',
        component: AssetsPermissions
    },
    {
        link: '/deposit',
        tag: 'deposit',
        component: AssetsDeposit
    },
    {
        link: '/withdraw',
        tag: 'withdraw',
        component: AssetWithdraw
    }
];

class MyAssets extends Component{
    render(){

        const userData = this.props.account;

        if(!userData) return <NeedToLogin pageName={'assets'} />;

        return(
            <div className="container page">
                <div className="page__user-title">
                    <h1 className="page__title">My Assets</h1>
                    <QuantityConverter assets={userData.assets} />
                </div>
                <PageMenu items={basicMenu} link={`/assets`} path={'/assets'} data={userData} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({account: state.accountData});

export default connect(mapStateToProps)(MyAssets);