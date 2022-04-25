import React, {Component} from "react";
import Table from "../../helpers/table";
import {getAssets} from "../../../actions/getAssets";
import {Radio} from "../../helpers/radio";
import Translate from "react-translate-component";
import TableCard from "../../helpers/cards";

const tableHead = [
    {
        key: 'asset',
        translateTag: 'asset',
        params: 'fit-content bold'
    },
    {
        key: 'issuer',
        translateTag: 'issuer',
        params: 'fit-content'
    },
    {
        key: 'supply',
        translateTag: 'supply',
        params: 'align-right'
    }
];

const radioGroup = [
    {
        text: <Translate content={"modal.newAssets.smartCoin"}/>,
        value: "smart"
    },
    {
        text: <Translate content={"createdAssets.issued"}/>,
        value: "issued"
    },
    {
        text: <Translate content={"createdAssets.prediction_assets"}/>,
        value: "prediction"
    }
];

class Assets extends Component {
    state = {
        assets: [],
        radio: ''
    };

    componentDidMount() {
        getAssets().then(e => this.setState({assets: e}));
    }

    render() {
        const {assets} = this.state;

        return (
            <div className="assets">
                <div className="assets__radioss">
                    {radioGroup.map(item =>
                        <Radio
                            key={item}
                            callback={() => this.setState({radio: item.value})}
                            name="asset"
                            value={item.value}
                            text={item.text}
                        />)}
                </div>
                <Table
                    tableHead={tableHead}
                    rows={assets}
                />
                <TableCard rows={assets} tableHead={tableHead}/>
            </div>
        )

    }
}

export default Assets;