import React, {Component, Fragment} from 'react';
import Table from "./table";
import {defaultQuote} from "../../params/networkParams";
import {formAssetsList} from "../../actions/assets/formAssetsList";
import ActionsBtn from "./buttons/actionsBtn";
import {getAccountData} from "../../actions/store";
import TableCards from "../helpers/cards"
const tableAssetsHead = [
    {
        key: "asset",
        translateTag: "asset",
        params: 'fit-content'
    },
    {
        key: "available",
        translateTag: "available",
        params: 'align-right fit-content'
    },
    {
        key: "priceUSD",
        translateTag: "priceWithToken",
        translateParams: {
            token: defaultQuote
        },
        params: 'fit-content'
    },
    {
        key: "change",
        translateTag: "change",
        params: 'align-center'
    },
    {
        key: "valueUSD",
        translateTag: "valueWithToken",
        translateParams: {
            token: defaultQuote
        },
        params: 'align-right fit-content'
    }
];

const getData = async () => {
    const name = getAccountData().name;
    let assetData = [];
    let assets = await formAssetsList(name);
    assets.map((item) => {
        assetData.push({
            asset: item.symbol,
            available: item.quantity / (10 ** item.precision),
            priceUSD: item.usdPrice,
            change: item.dailyChange === "0" ? item.dailyChange : item.dailyChange > 0 ? `+${item.dailyChange}` : `-${item.dailyChange}`,
            valueUSD: Number((item.quantity / (10 ** item.precision) * item.usdPrice).toFixed(5))
        })

    });

    return assetData;
};

class TableMyAssets extends Component {
    state = {
        data: false
    };

    componentDidMount() {
        getData().then(e => this.setState({data: e}));
    }

    render() {
        const {data} = this.state;

        return (
            <Fragment>
                {
                    data &&
                    <div>
                    <Table
                        tableHead={tableAssetsHead}
                        rows={data}
                    />
                    <TableCards tableHead={tableAssetsHead} rows={data}/>
                    </div>
                }
            </Fragment>
        )
    }
}

export default TableMyAssets;