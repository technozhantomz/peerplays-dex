import React, {Component} from "react";
import {CardHeader} from "../../helpers/cardHeader";
import {Asset} from "../../../classes";
import Translate from "react-translate-component";

const infoElems = ['settlementPrice', 'settlementFunds', 'settlementFundCollateralRatio'];

const formSettlement = async ({smartData, quoteAsset, baseAsset}) => {
    const {settlement_fund, settlement_price} = smartData;

    const newBaseAsset = new Asset({...baseAsset, amount: settlement_price.base.amount});
    const newQuoteAsset = new Asset({...quoteAsset, amount: settlement_price.quote.amount});

    return {
        settlementPrice: {
            title: <Translate content="block.settlement.settlementPrice"/>,
            text: isNaN(newBaseAsset.calculatePrice(newQuoteAsset)) ? '-' : `${newBaseAsset.calculatePrice(newQuoteAsset)} ${newBaseAsset.symbol}/${newQuoteAsset.symbol}`
        },
        settlementFunds: {
            title: <Translate content="block.settlement.settlementFunds"/>,
            text: settlement_fund
        },
        settlementFundCollateralRatio: {
            title: <Translate content="block.settlement.settlementFundCollateralRatio"/>,
            text: 0
        }
    }
};

class Settlement extends Component {
    state = {
        data: ''
    };

    componentDidMount() {
        this.getData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.basicData.symbol !== nextProps.basicData.symbol) this.getData(nextProps);
    }

    getData = (params) => formSettlement(params).then(data => this.setState({data}));

    render() {
        const data = this.state.data;
        const title = this.props.title;
        
        return (
            <div className="fee-pool card">
                <CardHeader title={`block.${title}.title`}/>
                <Translate component="div" className="card__comment" content={`block.${title}.text`}/>
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
}

export default Settlement;