import React from "react";
import {dbApi} from "./nodes";
import {setAssets} from "./setAssets";

export const getAssets = async () => {
    let assets = await dbApi('list_assets', ['', 25]).then(e => e);

    console.log(assets);

    assets = assets.map(async (item) => ({
        issuer: await dbApi('get_accounts', [[item.issuer]]).then(e => e[0].name),
        supply: await setAssets({quantity: Number(item.options.max_supply), asset: item.id}),
        asset: item.symbol
    }));

    assets = await Promise.all(assets);

    return assets;
};