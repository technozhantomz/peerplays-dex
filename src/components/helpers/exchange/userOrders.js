import React, {Component} from 'react';
import Table from "../table";
import NoData from "../noData";

class UserOrders extends Component{
    render(){

        if(!this.props.data) return <NoData />;

        const {tableHead, rows} = this.props.data;

        return(
            <div className="custom-scroll">
                <Table
                    className="table--exchange"
                    tableHead={tableHead}
                    rows={rows}
                />
            </div>
        )
    }
}

export default UserOrders;