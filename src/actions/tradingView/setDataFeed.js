import {getTimezone} from "./getTimezone";
import {formAssetData} from "../assets";
import TVData from "../../classes/tvData";
import {getStore} from "../store";

const supported_resolutions = ["1", "5", "15", "30", "60", "240", "D"];

export const setDataFeed = (pair) => ({
    interval: supported_resolutions[supported_resolutions.length - 1],
    latestBar: 0,
    supported_resolutions,
    ticker: pair,
    onReady: callback => setTimeout(() => {
        callback({
            exchanges: [{
                value: "OPEN.",
                name: "Openledger",
                desc: "Openledger Gateway"
            }],
            symbols_types: [],
            supported_resolutions,
            supports_marks: false,
            supports_search: false,
            supports_time: true
        });
    }, 10),
    resolveSymbol: (symbolName, onSymbolResolvedCallback) => {

        setTimeout(function () {
            if (!symbolName) return;

            const [base, quote] = symbolName.split('_');

            const quoteAsset = formAssetData({symbol: quote});
            const baseAsset = formAssetData({symbol: base});

            Promise.all([quoteAsset, baseAsset]).then(res => {
                const [quoteAsset, baseAsset] = res;

                const symbol_stub = {
                    name: symbolName,
                    quoteAsset,
                    baseAsset,
                    description: '',
                    timezone: getTimezone(),
                    type: 'bitcoin',
                    session: '24x7',
                    ticker: symbolName,
                    minmov: 1,
                    pricescale: 10000,
                    has_daily: true,
                    has_empty_bars: true,
                    has_intraday: true,
                    has_seconds: false,
                    intraday_multipliers: supported_resolutions,
                    supported_resolutions,
                    data_status: 'streaming',
                };

                if(quoteAsset.symbol.match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) symbol_stub.pricescale = 100;

                onSymbolResolvedCallback(symbol_stub);
            });

        }, 0);
    },
    getBars: (
        symbolInfo,
        resolution,
        from,
        to,
        onHistoryCallback
    ) => {

        let tvData = getStore().tradingView;

        if(!tvData){
            tvData = new TVData().init(symbolInfo, resolution);
        }

        if(tvData.resolution !== resolution){
            tvData = new TVData().init(symbolInfo, resolution);
        }

        if(tvData.list.length) {
            onHistoryCallback([], {noData: true});
            return;
        }

        tvData.getList(from, to).then(history => {
            if (!history.length) {
                onHistoryCallback([], {noData: true});
                return;
            }

            onHistoryCallback(history);
        });
    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
        getStore().tradingView.setUpdate(onRealtimeCallback);
    },
    unsubscribeBars: () => {
        //nothing
    },
    calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
        return undefined;
    }
});
