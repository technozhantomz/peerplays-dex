import React from "react";
import Table from "../../helpers/table";
import dataFetch from "../../helpers/dataFetch";
import {getUserAssets} from "../../../actions/dataFetching/accountData";

const UserAssets = ({data}) => (
    <Table
        tableHead={data.tableHead}
        rows={data.rows}
        link={{ path: '/asset/', key: 'symbol' }}
    />
);

export default dataFetch({ method: getUserAssets })( UserAssets );