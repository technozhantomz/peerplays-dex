import React, {Component} from "react";
import {getStorage} from "../../actions/storage";
import Dropdown from "./form/dropdown";
import SelectHeader from "./selectHeader";
import {bridgesList} from "../../params/bridgesApi";
import FieldWithHint from "./form/fieldWithHint";
import {getAccountData} from "../../actions/store";
import {testnetCheck} from "../../params/networkParams";

class BridgeSelector extends Component{
    state = {
        defaultData: {},
        bridgesList: [],
        listType: '',
        selectedBridge: '',
        coinsList: [],
        selectedCoin: ''
    };

    componentDidMount(){
        const {type, defaultData} = this.props;

        if(!defaultData) return;

        const bridgesList = Object.keys(defaultData).map((bridge, id) => (
            <button key={id} onClick={() => this.selectBridge(bridge)}>{bridge}</button>
        ));
        const listType = `${type}List`;

        this.setState({defaultData, listType, bridgesList});
    }

    selectBridge = selectedBridge => {
        this.props.clearData();
        const {defaultData, listType} = this.state
        const coinsList = defaultData[selectedBridge][listType].map((coin, id) => (
            <button key={id} onClick={() => this.selectCoin(coin)}>{coin}</button>
        ));
        this.setState({coinsList: [], selectedCoin: ''}, () => this.setState({selectedBridge, coinsList}));
    };

    selectCoin = selectedCoin => {
        this.props.clearData();
        const {selectedBridge, defaultData} = this.state;
        const coinParams = defaultData[selectedBridge].coinsList[selectedCoin];
        const bridgeParams = bridgesList.find(e => e.name === selectedBridge);
        const bridgeData = { coinParams, bridgeParams };
        this.props.handleSelect(bridgeData);
        this.setState({selectedCoin});
    };

    render(){
        const {bridgesList, selectedBridge, coinsList, selectedCoin} = this.state;

        if(!bridgesList.length) return <span />;

        return(
            <div className="bridges">
                <Dropdown
                    btn={<SelectHeader labelTag="field.labels.gateway" text={selectedBridge} />}
                    list={bridgesList}
                />
                {Boolean(coinsList.length) &&
                    <Dropdown
                        btn={<SelectHeader labelTag="field.labels.asset" text={selectedCoin}/>}
                        list={coinsList}
                    />
                }
            </div>
        )
    }
}

export default BridgeSelector;