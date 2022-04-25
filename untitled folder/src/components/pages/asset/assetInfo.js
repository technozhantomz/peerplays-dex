import React, {Component, Fragment} from "react";
import {dbApi} from "../../../actions/nodes";
import AssetStatistic from "../../helpers/assetStatistic";
import FeePool from "../../helpers/asset/feePool";
import PriceFeed from "../../helpers/asset/priceFeed";
import Settlement from "../../helpers/asset/settlement";
import Permissions from "../../helpers/asset/permissions";
import PriceFeedData from "../../helpers/asset/priceFeedData";
import CollateralBids from "../../helpers/asset/collateralBids";
import {setPermissions} from "../../../actions/assets/setPermissions";
import {getBasicAsset} from "../../../actions/store";
import {formAssetData} from "../../../actions/assets";
import {CardHeader} from "../../helpers/cardHeader";
import dataFetch from "../../helpers/dataFetch";

const assetInfo = async context => {
    const data = context.props.data;
    const {basicData, smartData, flags} = data;

    let obj = {}, helpArray = flags.concat(data.permissions);
    for (let i = 0; i < helpArray.length; i++) {
        let str = helpArray[i];
        obj[str] = true;
    }

    const permissions = Object.keys(obj);

    const orderData = await dbApi('get_call_orders', [basicData.id, 300]);
    const feeds = smartData ? smartData.feeds : false;

    const baseAsset = await formAssetData(basicData);
    const quoteAsset = getBasicAsset();

    return { ...data, permissions, orderData, baseAsset, quoteAsset, feeds };
};

const AssetInfo = ({data}) => {
    const {
        basicData,
        dynamicData,
        smartData,
        permissions,
        orderData,
        baseAsset,
        quoteAsset,
        feeds
    } = data;

    return (
        <div className="container">
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
        </div>
    )
}

export default dataFetch({method: assetInfo})(AssetInfo);