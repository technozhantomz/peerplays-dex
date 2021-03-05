import React, {Component, Fragment} from 'react';
import PairStats from "../helpers/exchange/pairStats";
import Tabs from "../helpers/tabs/tabs";
import OrderBook from "../helpers/exchange/orderBook";
import UserOrders from "../helpers/exchange/userOrders";
import BuyForm from "../helpers/exchange/buyForm";
import HistoryBook from "../helpers/exchange/historyBook";
import UserOrdersHistory from "../helpers/exchange/userOrdersHistory";
import NoData from "../helpers/noData";
import TradingViewWrapper from "../helpers/tradingViewWrapper";
import {connect} from "react-redux";
import {clearExchangeData, loadExchangeData} from "../../dispatch/exchangeData";
import Translate from "react-translate-component";

class Exchange extends Component{

    state = {
        isLoaded: false
    };

    async componentDidMount(){
        this.setPair(this.props);
    }

    componentWillReceiveProps(newProps){
        if(this.props.account.name !== newProps.account.name) this.setPair(newProps);

        if(this.props.match.params.pair !== newProps.match.params.pair){
            this.setState({isLoaded: false}, () => this.setPair(newProps));
        }
    }

    componentWillUnmount(){ clearExchangeData() };

    setPair = (props) => loadExchangeData(props.match.params.pair).then(() => this.setState({isLoaded: true}));

    handleOrderClick = (data) => this.setState({buySellParams: data});

    render(){

        const { isLoaded } = this.state;
        const { pair, stats, orderBook, globalHistory, userBook, userHistory, fieldParams } = this.props.exchangeData;

        if(!isLoaded) return <span>Loading...</span>;
        if(isLoaded && !pair) return <NoData />;

        return(
            <Fragment>
                <PairStats pair={pair} data={stats} history={this.props.history} />
                <div className="exchange">
                    <div className="exchange__left">
                        <Tabs head={['orderBook', 'history']}>
                            <OrderBook data={orderBook} handleRowClick={this.handleOrderClick} />
                            <HistoryBook data={globalHistory} />
                        </Tabs>
                    </div>
                    <div className="exchange__center custom-scroll">
                        <TradingViewWrapper pair={pair} />
                        <div className="exchange__center-content">
                            <div className="exchange__content-primary">
                                <Tabs head={['openOrders', 'orderHistory']}>
                                    <UserOrders data={userBook} />
                                    <UserOrdersHistory data={userHistory} />
                                </Tabs>
                            </div>
                            <div className="exchange__content-secondary">
                                <div className="exchange-form">
                                    <Translate content="exchange.buy" className="exchange-form__title" component="div" />
                                    <BuyForm
                                        type="buy"
                                        pair={pair}
                                        defaultData={fieldParams}
                                    />
                                </div>
                            </div>
                            <div className="exchange__content-secondary">
                                <div className="exchange-form">
                                    <Translate content="exchange.sell" className="exchange-form__title" component="div" />
                                    <BuyForm
                                        type="sell"
                                        pair={pair}
                                        defaultData={fieldParams}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="exchange__right empty">

                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    account: state.accountData,
    exchangeData: state.pageData
});

export default connect(mapStateToProps)(Exchange);
