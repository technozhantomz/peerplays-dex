import React from "react";
import Link from "react-router-dom/es/Link";
import {clearLayout} from "../../../dispatch/layoutDispatch";
import {dbApi} from "../../nodes";
import AssetStatistic from "../../../components/helpers/assetStatistic";
import {getDynamicData} from "../../assets/";
import {formAssetData} from "../../assets";
import {getBasicAsset} from "../../store";

export const lookupToken = val => {
    val = val.toUpperCase();
    return dbApi('list_assets', [val, 20]).then(list => Promise.all(list.map(async (el, id) => {
        const dynamicData = await getDynamicData(el.dynamic_asset_data_id);

        const baseAsset = await formAssetData(el);
        const quoteAsset = getBasicAsset();
        const title = <div className="card__header"><div className="card__title">{el.symbol}</div></div>;

        return <Link to={`/asset/${el.symbol}`} onClick={clearLayout}>
            <AssetStatistic
                key={id}
                title={title}
                basicData={el}
                dynamicData={dynamicData}
                baseAsset={baseAsset}
                quoteAsset={quoteAsset}
            />
        </Link>
    })));
};