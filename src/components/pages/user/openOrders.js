import React from "react";
import Table from "../../helpers/table";
import dataFetch from "../../helpers/dataFetch";
import {getOrders} from "../../../actions/dataFetching/accountData/";

const OpenOrders = ({data}) => <Table tableHead={data.tableHead} rows={data.rows} />;

export default dataFetch({ method: getOrders, page: 'userOrders' })(OpenOrders);