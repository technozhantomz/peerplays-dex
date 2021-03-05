import React, {Component} from "react";
import {getUserName} from "../../actions/account";
import {Asset} from "../../classes";
import Translate from "react-translate-component";
import {getBasicAsset} from "../../actions/store";

const infoElems = ['type', 'issuer', 'precision', 'backingAsset', 'currentSupply', 'stealthSupply', 'maxFee', 'maxSupply'];

const formAssetStatistic = async ({basicData, dynamicData, baseAsset, quoteAsset = getBasicAsset()}) => {
    const {bitasset_data_id, precision} = basicData;
    const {current_supply, confidential_supply} = dynamicData;
    const {max_market_fee, max_supply} = basicData.options;

    const type = bitasset_data_id ? 'smart' : 'simple';
    const issuer = await getUserName(basicData.issuer);
    const defaultAsset = new Asset({precision});

    return {
        type: {
            title: <Translate content="block.general.type"/>,
            text: type
        },
        precision: {
            title: <Translate content="block.general.precision"/>,
            text: precision
        },
        issuer: {
            title: <Translate content="block.general.issuer"/>,
            text: issuer
        },
        backingAsset: {
            title: <Translate content="block.general.backingAsset"/>,
            text: quoteAsset.symbol
        },
        currentSupply: {
            title: <Translate content="block.general.currentSupply"/>,
            text: defaultAsset.setPrecision(true, current_supply)
        },
        stealthSupply: {
            title: <Translate content="block.general.stealthSupply"/>,
            text: defaultAsset.setPrecision(true, confidential_supply)
        },
        maxFee: {
            title: <Translate content="block.general.maxFee"/>,
            text: defaultAsset.setPrecision(true, max_market_fee)
        },
        maxSupply: {
            title: <Translate content="block.general.maxSupply"/>,
            text: defaultAsset.setPrecision(true, max_supply)
        }
    };
};

class AssetStatistic extends Component {
    state = {
        data: ''
    };

    componentDidMount() {
        this.getData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.basicData.symbol !== nextProps.basicData.symbol) this.getData(nextProps);
    }

    getData = (params) => formAssetStatistic(params).then(data => this.setState({data}));

    render() {
        const {data} = this.state;

        return (
            <div className="asset-stats card">
                {this.props.title}
                {
                    data && <div className="asset-stats__items">
                        {infoElems.map((elem, index) => (
                            <div className="asset-stats__item" key={index}>
                                {data[elem].title}
                                <span>{data[elem].text}</span>
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
};

export default AssetStatistic;