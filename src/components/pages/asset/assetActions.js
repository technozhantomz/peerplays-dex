import React, {Component, Fragment} from "react";
import FundTheFeePool from "./fundTheFeePool";
import ClaimFeePoolBalance from "./claimFeePoolBalance";
import AssetClaimFees from "./assetClaimFees";
import AssetUpdateIssuer from "./assetUpdateIssuer";
import PublishFeed from "./publishFeed";
import {formAssetData} from "../../../actions/assets";
import {Asset} from "../../../classes";
import {dbApi} from "../../../actions/nodes";
import {getBasicAsset} from "../../../actions/store";

const formPublishFeed = val => {
    return dbApi('lookup_asset_symbols', [[val]]).then(async (assetList) => {
        const asset = assetList[0];
        const {bitasset_data_id} = asset;

        if (bitasset_data_id) return false;

        const smartData = await dbApi('get_objects', [[bitasset_data_id]]).then(e => e[0]);
        const {settlement_price, maintenance_collateral_ratio, maximum_short_squeeze_ratio} = smartData.current_feed;
        const baseAsset = await formAssetData(asset);
        const quoteAsset = getBasicAsset();

        const assetSP = await formAssetData(settlement_price.quote);

        return {
            forceSettlementPrice: {
                base: new Asset({...baseAsset, amount: settlement_price.base.amount}),
                quote: assetSP
            },
            settlement_price,
            mcr: maintenance_collateral_ratio/(10**3),
            mssr: maximum_short_squeeze_ratio/(10**3),
            cer: {
                base: new Asset({...baseAsset, amount: asset.options.core_exchange_rate.base.amount}),
                quote: new Asset({...quoteAsset, amount: asset.options.core_exchange_rate.quote.amount})
            },
            core_exchange_rate: asset.options.core_exchange_rate,
            baseAsset,
            quoteAsset,
            assetSP
        };
    });
};

class AssetActions extends Component {
    state = {
        data: false
    };

    componentDidMount() {
        formPublishFeed(this.props.match.params.symbol).then(data => this.setState({data}))
    }

    render() {
        const data = this.state.data;

        return (
            <Fragment>
                <div className="asset-action__rows">
                    <FundTheFeePool
                        title="fundTheFeePool"
                        symbol={this.props.match.params.symbol}
                    />
                    <ClaimFeePoolBalance
                        title="claimFeePoolBalance"
                        symbol={this.props.match.params.symbol}
                    />
                </div>
                <div className="asset-action__rows">
                    <AssetUpdateIssuer
                        title="assetUpdateIssuer"
                        symbol={this.props.match.params.symbol}
                    />
                    <AssetClaimFees
                        title="assetClaimFees"
                        symbol={this.props.match.params.symbol}
                    />
                </div>
                {
                    Boolean(data) &&
                    <div className="asset-action__rows">
                        <PublishFeed
                            title="publishFeed"
                            symbol={this.props.match.params.symbol}
                            data={data}
                        />
                    </div>
                }
                {/*<div className="asset-action__rows">*/}
                    {/*<BidCollateral*/}
                        {/*title="bidCollateral"*/}
                        {/*symbol={this.props.match.params.symbol}*/}
                    {/*/>*/}
                {/*</div>*/}
            </Fragment>
        )
    }
}

export default AssetActions;