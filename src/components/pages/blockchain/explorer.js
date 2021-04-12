import React, {Component, Fragment} from "react";
import Table from "../../helpers/table";
import {Card} from "../../helpers/card";
import {CardHeader} from "../../helpers/cardHeader";

const tableHeadRecentBlocks = [
    {
        key: 'blockID',
        translateTag: 'blockID',
        params: 'fit-content'
    },
    {
        key: 'date',
        translateTag: 'date',
        params: 'fit-content bold'
    },
    {
        key: 'witness',
        translateTag: 'witness',
        params: 'fit-content'
    },
    {
        key: 'transaction',
        translateTag: 'transaction'
    }
];

const tableRecentBlocks = [
    {
        blockID: "#32,617,402",
        date: "11:34:51 AM",
        witness: "Asset Name",
        transaction: "16"
    },{
        blockID: "#32,617,402",
        date: "11:34:51 AM",
        witness: "Asset Name",
        transaction: "16"
    },{
        blockID: "#32,617,402",
        date: "11:34:51 AM",
        witness: "Asset Name",
        transaction: "16"
    },{
        blockID: "#32,617,402",
        date: "11:34:51 AM",
        witness: "Asset Name",
        transaction: "16"
    },{
        blockID: "#32,617,402",
        date: "11:34:51 AM",
        witness: "Asset Name",
        transaction: "16"
    },{
        blockID: "#32,617,402",
        date: "11:34:51 AM",
        witness: "Asset Name",
        transaction: "16"
    },{
        blockID: "#32,617,402",
        date: "11:34:51 AM",
        witness: "Asset Name",
        transaction: "16"
    }
];

const tableHeadRecentActivity = [
    {
        key: 'operation',
        translateTag: 'operation',
        params: 'fit-content'
    },
    {
        key: 'user',
        translateTag: 'user',
        params: 'fit-content bold'
    },
    {
        key: 'details',
        translateTag: 'details',
        params: 'fit-content'
    },
    {
        key: 'transaction',
        translateTag: 'transaction'
    }
];

const tableRecentActivity = [
    {
        operation: <span className="operation negative">CANCEL ORDER</span>,
        user: "Username",
        details: "mary-poppins placed order",
        transaction: "#262445148 to buy 0.04044764 open.BTC at 141.76355258 open.LTC/open.BTC"
    },
    {
        operation: <span className="operation negative">CANCEL ORDER</span>,
        user: "Username",
        details: "mary-poppins placed order",
        transaction: "#262445148 to buy 0.04044764 open.BTC at 141.76355258 open.LTC/open.BTC"
    },{
        operation: <span className="operation negative">CANCEL ORDER</span>,
        user: "Username",
        details: "mary-poppins placed order",
        transaction: "#262445148 to buy 0.04044764 open.BTC at 141.76355258 open.LTC/open.BTC"
    },{
        operation: <span className="operation negative">CANCEL ORDER</span>,
        user: "Username",
        details: "mary-poppins placed order",
        transaction: "#262445148 to buy 0.04044764 open.BTC at 141.76355258 open.LTC/open.BTC"
    },{
        operation: <span className="operation negative">CANCEL ORDER</span>,
        user: "Username",
        details: "mary-poppins placed order",
        transaction: "#262445148 to buy 0.04044764 open.BTC at 141.76355258 open.LTC/open.BTC"
    },{
        operation: <span className="operation negative">CANCEL ORDER</span>,
        user: "Username",
        details: "mary-poppins placed order",
        transaction: "#262445148 to buy 0.04044764 open.BTC at 141.76355258 open.LTC/open.BTC"
    },
];

class Explorer extends Component {
    render() {
        return (
            <Fragment>
                <div className="card__list">
                    <Card mode="explorer">
                        <div className="card__title">
                            Current Block
                        </div>
                        <div className="card__content">
                            32,345,234
                        </div>
                    </Card>
                    <Card mode="explorer">
                        <div className="card__title">
                            Supply (TEST)
                        </div>
                        <div className="card__content">
                            2,456,345,676
                        </div>
                    </Card>
                    <Card mode="explorer">
                        <div className="card__title">
                            Active Witnesses
                        </div>
                        <div className="card__content">
                            23
                        </div>
                    </Card>
                    <Card mode="explorer">
                        <div className="card__title">
                            Confrimation Time (Sec)
                        </div>
                        <div className="card__content">
                            1.45
                        </div>
                    </Card>
                    <Card mode="explorer">
                        <div className="card__title">
                            Missed Blocks
                        </div>
                        <div className="card__content">
                            0
                        </div>
                    </Card>
                    <Card mode="explorer">
                        <div className="card__title">
                            Stealth Supply (TEST)
                        </div>
                        <div className="card__content">
                            234,234
                        </div>
                    </Card>
                </div>

                <Card mode="table">
                    <CardHeader title={'block.recentBlocks.title'}/>
                    <Table
                        tableHead={tableHeadRecentBlocks}
                        rows={tableRecentBlocks}
                    />
                </Card>
                <Card mode="table">
                    <CardHeader title={'block.recentBlocks.title'}/>
                    <Table
                        tableHead={tableHeadRecentActivity}
                        rows={tableRecentActivity}
                    />
                </Card>
            </Fragment>
        )
    }
}

export default Explorer;