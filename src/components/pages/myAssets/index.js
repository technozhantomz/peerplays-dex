import React, {Component} from 'react';
import Translate from "react-translate-component";
import AssetsPermissions from "./assetsPermissions";
import PageMenu from "../../helpers/pageMenu";
import QuantityConverter from "../../helpers/quantityConverter";
import {connect} from "react-redux";
import UserAssets from "../user/userAssets";
import OpenOrders from "../user/openOrders";
import UserActivity from "../user/userActivity";
import UserMargins from "../user/userMargins";
import NeedToLogin from "../../helpers/needToLogin";
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
                    <Translate className="page__title" component="h1" content={"assets.title"}/>
                    <QuantityConverter assets={userData.assets} />
                </div>
                <PageMenu items={basicMenu} link={`/assets`} path={'/assets'} data={userData} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({account: state.accountData});

export default connect(mapStateToProps)(MyAssets);