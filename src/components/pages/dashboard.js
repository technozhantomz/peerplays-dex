import React, {Component} from 'react';
import {CardHeader} from "../helpers/cardHeader";
import {Card} from "../helpers/card";
import {SmallCardContent} from "../helpers/smallCardContent";
import Add from '@material-ui/icons/Add';
import QuickSellBuy from "../helpers/quickSellBuy";
import SendForm from "../helpers/sendForm";
import {GraphTrends} from "../helpers/graphTrends";
import {GraphBtsBtc} from "../helpers/graphBtsBtc";
import {GraphMyAssets} from "../helpers/graphMyAssets";
import Table from "../helpers/table";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {setModal} from "../../dispatch/setModal";
import {MyAssetsModal} from "../helpers/myAssetsModal";
import OpenOrders from "../helpers/openOrders";
import NoData from "../helpers/noData";
import {getStorage} from "../../actions/storage";

const tableActivityHead = [
    {
        key: 'date',
        translateTag: '',
        params: 'fit-content'
    },
    {
        key: 'transaction',
        translateTag: '',
        params: 'fit-content'
    },
    {
        key: 'account',
        translateTag: '',
        params: 'align-right'
    },
    {
        key: 'cost',
        translateTag: '',
        params: 'align-right fit-content'
    },
    {
        key: 'receiver_name',
        translateTag: '',
        params: 'fit-content'
    },
    {
        key: 'operation_id',
        translateTag: '',
        params: 'align-right'
    },
    {
        key: 'fee',
        translateTag: '',
        params: 'align-right fit-content'
    },
    {
        key: 'actions',
        translateTag: '',
        params: 'align-right fit-content'
    }
];

const tableActivity = [
    {
        date: "06 Sep 2018",
        transaction: <span className="operation negative">Cancel order</span>,
        account: "bitshares.foundation",
        cost: "999,999,98.888888",
        receiver_name: "Receiver",
        operation_id: "1.11.163493312",
        fee: "Fee",
        actions: <button className="table__button"><MoreVertIcon/></button>
    },
    {
        date: "06 Sep 2018",
        transaction: <span className="operation positive">TRANSFER</span>,
        account: "bitshares.foundation",
        cost: "999,999,98.888888",
        receiver_name: "Receiver",
        operation_id: "1.11.163493312",
        fee: "Fee",
        actions: <button className="table__button"><MoreVertIcon/></button>
    },
    {
        date: "06 Sep 2018",
        transaction: <span className="operation positive">TRANSFER</span>,
        account: "bitshares.foundation",
        cost: "999,999,98.888888",
        receiver_name: "Receiver",
        operation_id: "1.11.163493312",
        fee: "Fee",
        actions: <button className="table__button"><MoreVertIcon/></button>
    },
];

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
        translateTag: "priceUSD",
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
        params: 'align-right fit-content'
    },
    {
        key: "actions",
        translateTag: "actions",
        params: 'align-right fit-content'
    }
];

const tableAssets = [
    {
        asset: "Asset Name",
        available: "0.00000000",
        priceUSD: "0.00000000",
        change: "+0.00 %",
        valueUSD: "26,635",
        actions: <button className="table__button"><MoreVertIcon/></button>
    },
    {
        asset: "Asset Name",
        available: "0.00000000",
        priceUSD: "0.00000000",
        change: "+0.00 %",
        valueUSD: "26,635",
        actions: <button className="table__button"><MoreVertIcon/></button>
    },
    {
        asset: "Asset Name",
        available: "0.00000000",
        priceUSD: "0.00000000",
        change: "+0.00 %",
        valueUSD: "26,635",
        actions: <button className="table__button"><MoreVertIcon/></button>
    }
];

class Dashboard extends Component {

    render() {

        if(!getStorage('account').name) return <NoData tag={'empty.login'} />;

        return (
            <div className="container">
                <div className="card__list">
                    <Card mode="small">
                        <SmallCardContent/>
                    </Card>
                    <Card mode="small">
                        <SmallCardContent/>
                    </Card>
                    <Card mode="small">
                        <SmallCardContent/>
                    </Card>
                    <Card mode="small">
                        <SmallCardContent/>
                    </Card>
                    <Card mode="small">
                        <SmallCardContent/>
                    </Card>
                    <Card mode="small">
                        <SmallCardContent/>
                    </Card>
                    {/*<button className="plus">*/}
                        {/*<Add/>*/}
                    {/*</button>*/}
                </div>


                <div className="graphs">
                    <Card mode="graph">
                        <CardHeader title={'Quick Sell / Buy'}/>
                        <QuickSellBuy/>
                    </Card>
                    <Card mode="graph">
                        <CardHeader title={'BTC / BTS'}/>
                        <GraphBtsBtc/>
                    </Card>
                    <Card mode="graph">
                        <CardHeader title={'My Assets'}/>
                        <GraphMyAssets/>
                    </Card>
                </div>

                <div className="graphs">
                    <Card mode="widget">
                        <CardHeader title={'Open Orders'}/>
                        <div className="card__content">
                            <OpenOrders/>
                        </div>
                    </Card>
                    <Card mode="widget">
                        <CardHeader title={'Send'}/>
                        <SendForm/>
                    </Card>
                </div>

                <div className="graphs">
                    <Card mode="widget">
                        <CardHeader title={'Trends'}/>
                        <GraphTrends/>
                    </Card>
                    <Card mode="widget">
                        <CardHeader title={'Today Trade Volume'}/>
                    </Card>
                </div>

                <div className="tables">
                    <span className="table--without_header">
                        <Card mode="table">
                            {/*<CardHeader title={'My Activity'} action={() => setModal(<MyAssetsModal/>)}/>*/}
                            <CardHeader title={'My Activity'}/>

                            <Table
                                tableHead={tableActivityHead}
                                rows={tableActivity}
                            />
                        </Card>
                    </span>
                    <Card mode="table">
                        <CardHeader title={'Open Orders'}/>
                        <Table
                            tableHead={tableAssetsHead}
                            rows={tableAssets}
                        />
                    </Card>
                </div>
            </div>
        )
    }
}

export default Dashboard;
