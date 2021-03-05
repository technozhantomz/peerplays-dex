import React from "react";
import Table from "../table";
import NoData from "../noData";

const UserOrdersHistory = ({data}) => {
    if(!data) return <NoData />;

    return (
        <div className="custom-scroll">
            <Table className="table--exchange" tableHead={data.tableHead} rows={data.rows} />
        </div>
    );
};

export default UserOrdersHistory;