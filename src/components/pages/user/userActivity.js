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
        key: 'sender',
        translateTag: 'info',
        params: 'fit-content'
    },
    {
        key: 'quantity',
        params: 'fit-content'
    },
    {
        key: 'receiver',
    },
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
    {
        key: 'actions',
        params: 'align-right fit-content actions'
    }
];

const UserActivity = ({data}) => <Table tableHead={tableHead} rows={data} />;

const fetchHistory = (context) => getUserHistory({
    userID: context.props.match.params.name,
    filter: 0,
    callback: formUserActivity
});

export default dataFetch(fetchHistory)(UserActivity);