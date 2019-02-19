import React, {Component} from "react";
import Dropdown from "./dropdown";
import SelectHeader from "./selectHeader";
import {dbApi} from "../../actions/nodes";
import {defaultQuote} from "../../params/networkParams";
import {getAsset, setPrecision} from "../../actions/assets";

const formQuantity = async (list, assetSymbol = defaultQuote) => {
    let quantity = 0;
    return await Promise.all(list.map(async asset => {
        const price = assetSymbol === asset.symbol ? 1 : await dbApi('get_ticker', [assetSymbol, asset.symbol]).then(e => e.latest);
        quantity = quantity + (price * asset.amount);
    })).then(() => quantity);
};

const formUserAssets = async (name) => {
    const userAssets = await dbApi('get_full_accounts', [[name], false]).then(e => e[0][1].balances);
    const defaultQuoteData = {amount: 0, symbol: defaultQuote};

    let haveDefaultQuote = false;

    let assets = await Promise.all(userAssets.map(async asset => {
        const {precision, symbol} = await getAsset(asset.asset_type);
        if(symbol === defaultQuote) haveDefaultQuote = true;
        return {
            amount: setPrecision(asset.balance, precision),
            symbol
        }
    }));

    if(!haveDefaultQuote) assets.unshift(defaultQuoteData);

    return assets;
};

class QuantityConverter extends Component{
    state = {
        assetsList: false,
        quantity: 0,
        selectedAsset: 0
    };

    componentDidMount(){
        formUserAssets(this.props.name).then(assetsList => formQuantity(assetsList).then(quantity => {
            this.setState({assetsList, quantity});
        }));
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.name !== this.props.name || nextState.quantity !== this.state.quantity;
    }

    changeQuantity = (id) => {
        const selectedAsset = id;
        const assetsList = this.state.assetsList;
        formQuantity(assetsList, assetsList[selectedAsset].symbol).then(quantity => this.setState({selectedAsset, quantity}));
    };

    render(){

        const assetsList = this.state.assetsList;

        if(!assetsList) return <span />;

        const {quantity, selectedAsset} = this.state;

        return(
            <div className="quantity-converter">
                <span className="quantity-converter__summ">{ quantity }</span>
                <Dropdown
                    btn={<SelectHeader text={assetsList[selectedAsset].symbol} />}
                    list={assetsList.map((el, id) => (
                        <button key={id} onClick={() => this.changeQuantity(id)}>{el.symbol}</button>
                    ))}
                />
            </div>
        )
    }
}

export default QuantityConverter;