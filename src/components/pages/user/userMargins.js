import React from "react";
import dataFetch from "../../helpers/dataFetch";
import Table from "../../helpers/table";
import {getMargins} from "../../../actions/dataFetching/accountData";

const UserMargins = ({data}) => (
    <Table
        tableHead={data.tableHead}
        rows={data.rows}
        link={{ path: '/asset/', key: 'asset' }}
    />
);

export default dataFetch({ method: getMargins })(UserMargins)