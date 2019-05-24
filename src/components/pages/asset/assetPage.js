import React, {Component} from "react";
import AssetInfo from "./assetInfo";
import PageMenu from "../../helpers/pageMenu";
import AssetActions from "./assetActions";
import AssetUpdate from "../../helpers/asset/assetUpdate";
import {setPermissions} from "../../../actions/assets/setPermissions";
import {dbApi} from "../../../actions/nodes";
import {connect} from "react-redux";
import dataFetch from "../../helpers/dataFetch";
import {clearAssetData, setAssetData} from "../../../dispatch";
import {getStore} from "../../../actions/store";
import {fetchAssetData} from "../../../actions/dataFetching";

const assetMenu = [
    {
        link: '/',
        tag: 'info',
        component: AssetInfo
    },
    {
        link: '/actions',
        tag: 'actions',
        component: AssetActions
    }
];

const additionalMenu = [{
    link: '/update',
    tag: 'assetUpdate',
    component: AssetUpdate
}];

class AssetPage extends Component {
    state = {
        menu: ''
    };

    componentDidMount() {
        this.setMenu(this.props);
    }

    componentWillReceiveProps(nextProps){
        if(
            nextProps.account.name !== this.props.account.name ||
            nextProps.assetData.basicData.issuer !== this.props.assetData.basicData.issuer
        ) this.setMenu(nextProps);
    }

    componentWillUnmount(){
        clearAssetData();
    }

    setMenu = (props) => {
        const userIsIssuer = props.account.id === props.assetData.basicData.issuer;
        const menu = userIsIssuer ? assetMenu.concat(additionalMenu) : assetMenu;
        this.setState({menu})
    };

    render() {

        const menu = this.state.menu;

        if(!this.state.menu) return <span />;

        const assetData = {
            ...this.props.assetData,
            accountId: this.props.account.id
        };

        const symbol = this.props.assetData.basicData.symbol;

        return (
            <div className="container page">
                <div className="page__header-wrapper">
                    <h1 className="page__title">Asset {symbol}</h1>
                </div>
                <PageMenu items={menu} link={`/asset/${symbol}`} path={'/asset/:symbol'} data={assetData} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    assetData: state.pageData,
    account: state.accountData
});

const page = connect(mapStateToProps)(AssetPage);

export default dataFetch({method: fetchAssetData, disableNextProps: true})(page);