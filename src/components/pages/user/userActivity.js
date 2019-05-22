import React from "react";
import Table from "../../helpers/table";
import dataFetch from "../../helpers/dataFetch";
import {getUserHistory} from "../../../actions/dataFetching";
import {formUserActivity} from "../../../actions/dataFetching/historyCallbacks";

const tableHead = [
    {
        key: 'time',
        translateTag: 'time',
        params: 'fit-content'
    },
    {
        key: 'type',
        translateTag: 'type',
        params: 'fit-content'
    },
    {
        key: 'info',
        translateTag: 'info',
        // params: 'fit-content'
    },
    // {
    //     key: 'quantity',
    //     params: 'fit-content'
    // },
    // {
    //     key: 'receiver',
    // },
    {
        key: 'id',
        translateTag: 'id',
        params: 'align-center fit-content'
    },
    {
        key: 'fee',
        translateTag: 'fee',
        params: 'fit-content'
    },
    // {
    //     key: 'actions',
    //     params: 'align-right fit-content actions'
    // }
];

const UserActivity = ({data}) => <Table tableHead={tableHead} rows={data} />;

export default dataFetch({ method: formUserActivity, page: 'activity' })(UserActivity);