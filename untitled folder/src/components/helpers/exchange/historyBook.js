import React from "react";
import Table from "../table";
import NoData from "../noData";

const HistoryBook = ({data}) => {
    if(!data || !data.rows) return <NoData />;
    return (
        <div className="custom-scroll">
            <Table
                className="table--exchange"
                tableHead={data.tableHead}
                rows={data.rows}
            />
        </div>
    )
};

export default HistoryBook;