import React, {Component} from "react";
import Dropdown from "./dropdown";
import SelectHeader from "./selectHeader";

const assetsList = [
    {
        name: 'BTS',
        multiplier: 1
    },
    {
        name: 'UTDEV',
        multiplier: 0.1
    }
];

class QuantityConverter extends Component{
    state = {
        basicQuantity: 34556710.98532,
        selectedAsset: 0
    };

    render(){

        const {basicQuantity, selectedAsset} = this.state;

        return(
            <div className="quantity-converter">
                <span className="quantity-converter__summ">{ basicQuantity * assetsList[selectedAsset].multiplier }</span>
                <Dropdown
                    btn={<SelectHeader text={assetsList[selectedAsset].name} />}
                    list={assetsList.map((el, id) => (
                        <button key={id} onClick={() => this.setState({selectedAsset: id})}>{el.name}</button>
                    ))}
                />
            </div>
        )
    }
}

export default QuantityConverter;