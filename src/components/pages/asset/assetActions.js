import React, {Fragment} from "react";
import FundTheFeePool from "../../helpers/asset/fundTheFeePool";
import ClaimFeePoolBalance from "../../helpers/asset/claimFeePoolBalance";
import AssetClaimFees from "../../helpers/asset/assetClaimFees";
import AssetUpdateIssuer from "../../helpers/asset/assetUpdateIssuer";
import PublishFeed from "../../helpers/asset/publishFeed";
import {formAssetData} from "../../../actions/assets";
import {Asset} from "../../../classes";
import {getBasicAsset} from "../../../actions/store";
import dataFetch from "../../helpers/dataFetch";

const formPublishFeed = async context => {
    const data = context.props.data;
    const {basicData, smartData} = data;

    if (!smartData) return {basicData, issuerForms: data.accountId === basicData.issuer};

    const {settlement_price, maintenance_collateral_ratio, maximum_short_squeeze_ratio} = smartData.current_feed;
    const baseAsset = await formAssetData(basicData);
    const quoteAsset = getBasicAsset();

    const assetSP = await formAssetData(settlement_price.quote);

    return {
        basicData,
        forceSettlementPrice: {
            base: new Asset({...baseAsset, amount: settlement_price.base.amount}),
            quote: assetSP
        },
        settlement_price,
        mcr: maintenance_collateral_ratio/(10**3),
        mssr: maximum_short_squeeze_ratio/(10**3),
        cer: {
            base: new Asset({...baseAsset, amount: basicData.options.core_exchange_rate.base.amount}),
            quote: new Asset({...quoteAsset, amount: basicData.options.core_exchange_rate.quote.amount})
        },
        core_exchange_rate: basicData.options.core_exchange_rate,
        baseAsset,
        quoteAsset,
        assetSP,
        issuerForms: data.accountId === basicData.issuer
    };
};

const AssetActions = ({data}) => {
    return (
        <Fragment>
            <div className="asset-action__rows">
                <FundTheFeePool
                    title="fundTheFeePool"
                    symbol={data.basicData.symbol}
                />
                {
                    Boolean(data.issuerForms) &&
                    <ClaimFeePoolBalance
                        title="claimFeePoolBalance"
                        symbol={data.basicData.symbol}
                    />
                }
            </div>
            {
                Boolean(data.issuerForms) &&
                <div className="asset-action__rows">
                    <AssetUpdateIssuer
                        title="assetUpdateIssuer"
                        symbol={data.basicData.symbol}
                    />
                    <AssetClaimFees
                        title="assetClaimFees"
                        symbol={data.basicData.symbol}
                    />
                </div>
            }
            {
                Boolean(data.forceSettlementPrice) &&
                <div className="asset-action__rows">
                    <PublishFeed
                        title="publishFeed"
                        symbol={data.basicData.symbol}
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
};

export default dataFetch({method: formPublishFeed})(AssetActions);