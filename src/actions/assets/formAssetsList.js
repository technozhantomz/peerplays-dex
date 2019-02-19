import {defaultQuote} from "../../params/networkParams";
import {dbApi} from "../nodes";

export const formAssetsList = async (name, balances) => {
    if(!balances) balances = await dbApi('get_full_accounts', [[name], false]).then(acc => acc[0][1].balances);

    return await Promise.all(balances.map(async asset => {
        const data = await dbApi('get_assets', [[asset.asset_type]]).then(e => e[0]);
        const tiker = await dbApi('get_ticker', [data.symbol, defaultQuote]);
        return {
            id: asset.asset_type,
            symbol: data.symbol,
            precision: data.precision,
            quantity: Number(asset.balance),
            usdPrice: tiker.latest,
            dailyChange: tiker.percent_change
        };
    }));
}