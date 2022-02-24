import React, { Component } from 'react';
import Dropdown from "../form/dropdown";
import SelectHeader from "../selectHeader";
import TableHeading from "../tableHeading";
import NoData from "../noData";
import OrderBookTable from "./orderBookTable";
import { updateExchangeFields } from "../../../dispatch/exchangeData";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
class OrderBook extends Component {

    state = {
        type: 'all',
        threshold: '0.001'
    };

    onRowClick = fieldParams => updateExchangeFields({ fieldParams });

    render() {

        if (!this.props.data) return <NoData />;

        const { type, threshold } = this.state;
        const tableData = this.props.data;
        const types = ['all', 'sell', 'buy'];
        const thresholds = ['0.001','0.005', '0.01'];

        const toolTipStyle = {
            backgroundColor: 'black',
            color: 'white',
            testAlign: 'center',
            borderRadius: '6px',
            padding: '5px 5px 5px 5px',
            position: 'absolute',
            bottom: '150%',
            left: '50%',
        }


        return (
            <div className="order-book">
                <div className="order-filters">
                    <div className="order-filters__types">
                        {types.map(el => (
                            <OverlayTrigger key={el} placement="right" overlay={el === 'all' ? <Tooltip style={toolTipStyle}>Total Orders</Tooltip> : el === 'sell' ? <Tooltip style={toolTipStyle}>Sell Orders</Tooltip> : <Tooltip style={toolTipStyle}>Buy Orders</Tooltip>}>
                                <button
                                    key={el}
                                    className={`order-filters__type order-filters__type--${el}${el === type ? ' active' : ''}`}
                                    onClick={() => this.setState({ type: el })}
                                >
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                            </OverlayTrigger>
                        ))}
                    </div>
                    <div className="order-filters__threshold-wrapper">
                        <span className="order-filters__threshold">Threshold</span>
                        <Dropdown
                            btn={<SelectHeader text={threshold} />}
                            list={thresholds.map(el => (
                                <button key={el} onClick={() => this.setState({ threshold: el })}>{el}</button>
                            ))}
                        />
                    </div>
                </div>
                <div className="table table--exchange">
                    <TableHeading tableHead={tableData.sell.sellHeader} />
                </div>
                <OrderBookTable data={tableData} type={type} threshold={threshold} handleRowClick={this.onRowClick} />
            </div>

        )
    }
}

export default OrderBook;
