import React, {Component} from 'react';
import {connect} from "react-redux";
import {CardHeader} from "../helpers/cardHeader";
import {Card} from "../helpers/card";
import {SmallCardContent} from "../helpers/smallCardContent";
import QuickSellBuy from "../helpers/quickSellBuy";
import SendForm from "../helpers/sendForm";
import {GraphTrends} from "../helpers/graphTrends";
import {GraphBtsBtc} from "../helpers/graphBtsBtc";
import OpenOrders from "../helpers/openOrders";
import GraphMyAssets from "../helpers/graphMyAssets";
import TableMyAssets from "../helpers/tableMyAssets"
import NeedToLogin from "../helpers/needToLogin";
import UserActivity from './user/userActivity'

class Dashboard extends Component {
    render() {
        if (!this.props.account) return <NeedToLogin pageName={'dashboard'}/>;

        let data = this.props.account;
        data.history = this.props.account.history.slice(0, 10);

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
                </div>


                <div className="graphs">
                    <Card mode="graph">
                        <CardHeader title={`block.quickSellBuy.title`}/>
                        <QuickSellBuy/>
                    </Card>
                    <Card mode="graph">
                        <CardHeader title={`block.graph.title`} additionalData={{token: "BTC / BTH"}}/>
                        <GraphBtsBtc/>
                    </Card>
                    <Card mode="graph">
                        <CardHeader title={`block.myPortfolio.title`}/>
                        <GraphMyAssets/>
                    </Card>
                </div>

                <div className="graphs">
                    <Card mode="widget">
                        <CardHeader title={`block.openOrders.title`}/>
                        <div className="card__content">
                            <OpenOrders/>
                        </div>
                    </Card>
                    <Card mode="widget">
                        <CardHeader title={`block.send.title`}/>
                        <SendForm/>
                    </Card>
                </div>

                <div className="graphs">
                    <Card mode="widget">
                        <CardHeader title={`block.trends.title`}/>
                        <GraphTrends/>
                    </Card>
                    <Card mode="widget">
                        <CardHeader title={`block.todayTradeVolume.title`}/>
                    </Card>
                </div>

                <div className="tables">
                    {
                        Boolean(data) &&
                        <span className="table--without_header">
                            <Card mode="table">
                                <CardHeader title={`block.myActivity.title`}/>
                                <UserActivity data={data}/>
                            </Card>
                        </span>
                    }
                    <Card mode="table">
                        <CardHeader title={`block.myAssets.title`}/>
                        <TableMyAssets/>
                    </Card>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({account: state.accountData});

export default connect(mapStateToProps)(Dashboard);
