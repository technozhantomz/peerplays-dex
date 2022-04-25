import {historyApi} from "../../nodes";
import {Asset} from "../../../classes";
import {formatDate} from "../../formDate";

const calculatePrice = (baseAmount, basePrecision, quoteAmount, quotePrecision) => {
    const base = new Asset({amount: baseAmount, precision: basePrecision});
    const quote =  new Asset({amount: quoteAmount, precision: quotePrecision});
    return quote.calculatePrice(base);
};

const getBucketFromResolution = (r) => {
    if (r === "D") return 24 * 60 * 60;

    if (r.indexOf("W") !== -1) {
        return parseInt(r.replace("D", ""), 10) * 7 * 24 * 60 * 60;
    } else if (r.indexOf("D") !== -1) {
        return parseInt(r.replace("D", ""), 10) * 24 * 60 * 60;
    } else if (r.indexOf("S") !== -1) {
        return parseInt(r.replace("S", ""), 10);
    } else {
        return parseInt(r, 10) * 60;
    }
};

const getMarketHistory = (params, history = []) => historyApi('get_market_history', params).then(newHistory => {
    if(!newHistory || !newHistory.length) return history;

    history = [...history, ...newHistory];

    const lastDate = new Date(history[history.length - 1].key.open).getTime();
    const endDate = new Date(params[4]).getTime();

    // console.log(lastDate, history);

    if(newHistory.length === 200 && lastDate < endDate){
        params[3] = formatDate(lastDate);
        return getMarketHistory(params, history);
    }

    return history;
});

export const getPriceHistory = async (pair, resolution, from, to) => {

    // console.log('---resol', resolution);

    const {base, quote} = pair;

    // const base = symbolInfo.baseAsset;
    // const quote = symbolInfo.quoteAsset;

    const startDate = formatDate(from);
    const endDate = formatDate(to);

    const bucketStize = getBucketFromResolution(resolution);

    return getMarketHistory([base.id, quote.id, bucketStize, startDate, endDate])
        .then(e => {

            if(!e || !e.length) return [];

            const basePrecision = base.precision;
            const quotePrecision = quote.precision;

            return e.map(el => {
                const reverse = el.key.quote !== quote.id;

                const time = new Date(el.key.open).getTime();

                let low, high, volume, open, close;

                if(reverse){
                    high = calculatePrice(el.high_quote, basePrecision, el.high_base, quotePrecision);
                    low = calculatePrice(el.low_quote, basePrecision, el.low_base, quotePrecision);
                    open = calculatePrice(el.open_quote, basePrecision, el.open_base, quotePrecision);
                    close = calculatePrice(el.close_quote, basePrecision, el.close_base, quotePrecision);
                    volume = quote.setPrecision(true, el.quote_volume);
                } else {
                    high = calculatePrice(el.low_base, basePrecision, el.low_quote, quotePrecision);
                    low = calculatePrice(el.high_base, basePrecision, el.high_quote, quotePrecision);
                    open = calculatePrice(el.open_base, basePrecision, el.open_quote, quotePrecision);
                    close = calculatePrice(el.close_base, basePrecision, el.close_quote, quotePrecision);
                    volume = base.setPrecision(true, el.base_volume);
                }

                return {time, low, high, open, close, volume};
            });
        });
};