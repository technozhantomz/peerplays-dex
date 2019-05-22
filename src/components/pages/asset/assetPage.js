import React, {Component, Fragment} from "react";
import AssetInfo from "./assetInfo";
import PageMenu from "../../helpers/pageMenu";
import AssetActions from "./assetActions";

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

class AssetPage extends Component {
    state = {
    };

    componentDidMount() {

    }

    render() {
        const symbol = this.props.match.params.symbol;
        return (
            <div className="container page">
                <div className="page__header-wrapper">
                    <h1 className="page__title">Asset {symbol}</h1>
                </div>
                <PageMenu items={assetMenu} link={`/asset/${symbol}`} path={'/asset/:symbol'} />
            </div>
        )
    }
}

export default AssetPage;