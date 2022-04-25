import React, {Component} from 'react';
import {setDataFeed} from "../../actions/tradingView";
import {getTimezone} from "../../actions/tradingView/getTimezone";
const {TradingView} = require("../../charting_library/charting_library.min");

const defaultParams = {
    container_id: "tradingview",
    library_path: `/`,
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    autosize: true,
    overrides: {
        "paneProperties.background": "rgba(255, 255, 255, 1)",
        "paneProperties.horzGridProperties.color": "rgba(255, 255, 255, 1)",
        "paneProperties.vertGridProperties.color": "rgba(255, 255, 255, 1)"
    },
    enabled_features: ["study_templates", "keep_left_toolbar_visible_on_small_screens"],
    disabled_features: ["header_saveload", "symbol_info", "symbol_search_hot_key", "border_around_the_chart", "header_symbol_search", "header_compare"]
};

class TradingViewWrapper extends Component {
    componentDidMount(){

        if(process.env.NODE_ENV !== 'production') return;

        const {pair} = this.props;
        const symbol = `${pair.quote.symbol}_${pair.base.symbol}`;

        const datafeed = setDataFeed(symbol);
        const timezone = getTimezone();

        new TradingView.widget({ ...defaultParams, symbol, datafeed, timezone });
    }

    render(){
        return <div id="tradingview" className="exchange__graph" />;
    }
}

export default TradingViewWrapper