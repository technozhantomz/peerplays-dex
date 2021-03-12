import React from "react";
import ActionsBtn from "../helpers/actionsBtn";
import Table from "../helpers/table";

const activities = [
    {
        time: '06 Sep 2018',
        type: <span className="operation negative">CANCEL ORDER</span>,
        sender: 'bitshares.foundation',
        quantity: '999,999,98.888888',
        receiver: 'Receiver',
        id: '1.11.163493312',
        fee: 'Fee'
    },
    {
        time: '06 Sep 2018',
        type: <span className="operation negative">CANCEL ORDER</span>,
        sender: 'bitshares.foundation',
        quantity: '999,999,98.888888',
        receiver: 'Receiver',
        id: '1.11.163493312',
        fee: 'Fee'
    },
    {
        time: '06 Sep 2018',
        type: <span className="operation negative">CANCEL ORDER</span>,
        sender: 'bitshares.foundation',
        quantity: '999,999,98.888888',
        receiver: 'Receiver',
        id: '1.11.163493312',
        fee: 'Fee'
    },
    {
        time: '06 Sep 2018',
        type: <span className="operation negative">CANCEL ORDER</span>,
        sender: 'bitshares.foundation',
        quantity: '999,999,98.888888',
        receiver: 'Receiver',
        id: '1.11.163493312',
        fee: 'Fee'
    },
    {
        time: '06 Sep 2018',
        type: <span className="operation negative">CANCEL ORDER</span>,
        sender: 'bitshares.foundation',
        quantity: '999,999,98.888888',
        receiver: 'Receiver',
        id: '1.11.163493312',
        fee: 'Fee'
    },
    {
        time: '06 Sep 2018',
        type: <span className="operation negative">CANCEL ORDER</span>,
        sender: 'bitshares.foundation',
        quantity: '999,999,98.888888',
        receiver: 'Receiver',
        id: '1.11.163493312',
        fee: 'Fee'
    },
    {
        time: '06 Sep 2018',
        type: <span className="operation negative">CANCEL ORDER</span>,
        sender: 'bitshares.foundation',
        quantity: '999,999,98.888888',
        receiver: 'Receiver',
        id: '1.11.163493312',
        fee: 'Fee'
    },
    {
        time: '06 Sep 2018',
        type: <span className="operation negative">CANCEL ORDER</span>,
        sender: 'bitshares.foundation',
        quantity: '999,999,98.888888',
        receiver: 'Receiver',
        id: '1.11.163493312',
        fee: 'Fee'
    },
    {
        time: '06 Sep 2018',
        type: <span className="operation negative">CANCEL ORDER</span>,
        sender: 'bitshares.foundation',
        quantity: '999,999,98.888888',
        receiver: 'Receiver',
        id: '1.11.163493312',
        fee: 'Fee'
    }
];

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

const UserActivity = () => {

    const newAssets = [...activities].map((el) => ({...el, ...{
            actions: <div className="actions__wrapper">
                <ActionsBtn
                    actionsList={[
                        <button>Reset Settings</button>,
                        <button>Body 2</button>,
                        <button>Body 2</button>
                    ]}
                />
            </div>
        }}));

    return (
        <Table
            tableHead={tableHead}
            rows={newAssets}
        />
    );
};

export default UserActivity;