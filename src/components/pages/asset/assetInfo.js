import React, {Component, Fragment} from "react";
import {dbApi} from "../../../actions/nodes";
import AssetStatistic from "../../helpers/assetStatistic";
import FeePool from "./feePool";
import PriceFeed from "./priceFeed";
import Settlement from "./settlement";
import Permissions from "./permissions";
import PriceFeedData from "./priceFeedData";
import CollateralBids from "./collateralBids";
import {setPermissions} from "../../../actions/assets/setPermissions";
import {getBasicAsset} from "../../../actions/store";
import {formAssetData} from "../../../actions/assets";
import {CardHeader} from "../../helpers/cardHeader";

const assetInfo = val => {
    return dbApi('lookup_asset_symbols', [[val]]).then(async (assetList) => {
        const asset = assetList[0];
        const {bitasset_data_id, dynamic_asset_data_id, id} = asset;

        const flag = setPermissions(asset.options.flags, bitasset_data_id);
        const issuer = setPermissions(asset.options.issuer_permissions, bitasset_data_id);

        let idsArray = [dynamic_asset_data_id];

        if (bitasset_data_id) idsArray.push(bitasset_data_id);

        const [dynamicData, smartData] = await dbApi('get_objects', [idsArray]).then(e => e);

        let obj = {}, helpArray = flag.concat(issuer);
        for (let i = 0; i < helpArray.length; i++) {
            let str = helpArray[i];
            obj[str] = true;
        }

        const permissions = Object.keys(obj);

        const orderData = await dbApi('get_call_orders', [id, 300]).then(e => e);

        const baseAsset = await formAssetData(asset);
        const quoteAsset = getBasicAsset();

        return {
            basicData: asset,
            dynamicData,
            smartData,
            permissions,
            orderData,
            baseAsset,
            quoteAsset,
            feeds: smartData ? smartData.feeds : false
        };
    });
};

class AssetInfo extends Component {
    state = {
        data: false
    };

    componentDidMount() {
        assetInfo(this.props.match.params.symbol).then(data => this.setState({data}));
    }

    render() {
        const {
            basicData,
            dynamicData,
            smartData,
            permissions,
            orderData,
            baseAsset,
            quoteAsset,
            feeds
        } = this.state.data;

        return (
            <div className="container">
                {
                    this.state.data &&
                    <Fragment>
                        <AssetStatistic
                            title={<CardHeader title={`block.general.title`}/>}
                            basicData={basicData}
                            dynamicData={dynamicData}
                            baseAsset={baseAsset}
                            quoteAsset={quoteAsset}
                        />


                        {
                            Boolean(permissions.length) &&
                            <Permissions
                                title="permissions"
                                permissions={permissions}
                            />
                        }

                        <FeePool
                            title="fee"
                            basicData={basicData}
                            smartData={smartData}
                            quoteAsset={quoteAsset}
                            baseAsset={baseAsset}
                            dynamicData={dynamicData}
                        />

                        {
                            Boolean(smartData) &&
                            <Fragment>
                                <PriceFeed
                                    title="priceFeedData"
                                    smartData={smartData}
                                    quoteAsset={quoteAsset}
                                    baseAsset={baseAsset}
                                />

                                <Settlement
                                    title="settlement"
                                    smartData={smartData}
                                    quoteAsset={quoteAsset}
                                    baseAsset={baseAsset}
                                />
                            </Fragment>
                        }

                        {
                            Boolean(feeds) &&
                            <PriceFeedData
                                title="priceFeedData"
                                basicData={basicData}
                                feeds={feeds}
                                quoteAsset={quoteAsset}
                                baseAsset={baseAsset}
                            />
                        }

                        {
                            Boolean(orderData) &&
                            <CollateralBids
                                title="collateralBids"
                                basicData={basicData}
                                orderData={orderData}
                                quoteAsset={quoteAsset}
                                baseAsset={baseAsset}
                            />
                        }
                    </Fragment>

                }
            </div>
        )
    }
}

export default AssetInfo;