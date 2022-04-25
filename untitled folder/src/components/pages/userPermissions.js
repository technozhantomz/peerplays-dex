import React from "react";
import ActionsBtn from "../helpers/actionsBtn";
import Table from "../helpers/table";
import Dropdown from "../helpers/dropdown";
import SelectHeader from "../helpers/selectHeader";
import Input from "../helpers/input";

const ownership = [
    {
        key: 'BTS6xBpRPesCSSS1mjKDF61PN8BLuroYfXLaCVkrQU3v2ukaBDdk3',
        weight: '1'
    },
    {
        key: 'BTS6xBpRPesCSSS1mjKDF61PN8BLuroYfXLaCVkrQU3v2ukaBDdk3',
        weight: '1'
    }
];

const management = [
    {
        key: 'BTS6xBpRPesCSSS1mjKDF61PN8BLuroYfXLaCVkrQU3v2ukaBDdk3',
        weight: '33%'
    },
    {
        key: 'BTS6xBpRPesCSSS1mjKDF61PN8BLuroYfXLaCVkrQU3v2ukaBDdk3',
        weight: '33%'
    }
];

const memo = [
    {
        key: 'BTS6xBpRPesCSSS1mjKDF61PN8BLuroYfXLaCVkrQU3v2ukaBDdk3',
        weight: '33%'
    },
    {
        key: 'BTS6xBpRPesCSSS1mjKDF61PN8BLuroYfXLaCVkrQU3v2ukaBDdk3',
        weight: '33%'
    }
];

const tableHead = [
    {
        key: 'key',
        translateTag: 'key',
    },
    {
        key: 'weight',
        translateTag: 'weight',
        params: 'align-center fit-content'
    },
    {
        key: 'actions',
        params: 'align-right fit-content actions'
    }
];

const tableHeadMemo = [
    {
        key: 'key',
        translateTag: 'key',
    },
    {
        key: 'actions',
        params: 'align-right fit-content actions'
    }
];

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

const tableHeadActivities = [
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

const UserPermissions = () => {

    const newOwnership = [...ownership].map((el) => ({...el, ...{
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

    const newManagement = [...management].map((el) => ({...el, ...{
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

    const newMemo = [...memo].map((el) => ({...el, ...{
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

    const newActivities = [...activities].map((el) => ({...el, ...{
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
        <div className="permissions">
            <div className="permissions__header">
                <div className="permissions__title-wrapper">
                    <h2 className="permissions__title">Account Ownership</h2>
                    <span className="permissions__subtitle">Owner permissions define who has control over the account. Owners may overwrite all keys and change any account settings.</span>
                </div>
                <div className="permissions__filter-wrapper">
                    <span>Threshold</span>
                    <Dropdown
                        btn={<SelectHeader
                            text={'Number'}
                            className="with-bg"
                        />}
                        list={[
                            'Number', '%'
                        ].map((e, id) => <button key={id} onClick={this.changeLock}>{e}</button>)}
                    />
                    <Input
                        className="with-bg"
                        value={2}
                        disabled
                    />
                </div>
            </div>
            <div className="permissions__table">
                <Table
                    tableHead={tableHead}
                    rows={newOwnership}
                />
                <button className="btn-round">Add Permission</button>
            </div>
            <div className="permissions__header">
                <div className="permissions__title-wrapper">
                    <h2 className="permissions__title">Assets Management</h2>
                    <span className="permissions__subtitle">Active permissions define the accounts that have permission to spend funds for this account.</span>
                </div>
                <div className="permissions__filter-wrapper">
                    <span>Threshold</span>
                    <Dropdown
                        btn={<SelectHeader
                            text={'%'}
                            className="with-bg"
                        />}
                        list={[
                            'Number', '%'
                        ].map((e, id) => <button key={id} onClick={this.changeLock}>{e}</button>)}
                    />
                    <Input
                        className="with-bg"
                        value={66}
                        disabled
                    />
                </div>
            </div>
            <div className="permissions__table">
                <Table
                    tableHead={tableHead}
                    rows={newManagement}
                />
                <button className="btn-round">Add Permission</button>
            </div>
            <div className="permissions__header">
                <div className="permissions__title-wrapper">
                    <h2 className="permissions__title">Memos View</h2>
                    <span className="permissions__subtitle">The memo key is where you receive memos, in order to decode the memos you need to control the private key for the public key. By using a public/private key pair without spending authority, you may give read-only access to your memos to third parties.</span>
                </div>
            </div>
            <div className="permissions__table">
                <Table
                    tableHead={tableHeadMemo}
                    rows={newMemo}
                />
                <button className="btn-round">Add Key</button>
            </div>
            <div className="permissions__header">
                <div className="permissions__title-wrapper">
                    <h2 className="permissions__title">Permissions Related Activity </h2>
                    <span className="permissions__subtitle">Active permissions define the accounts that have permission to spend funds for this account.</span>
                </div>
            </div>
            <div className="permissions__table">
                <Table
                    tableHead={tableHeadActivities}
                    rows={newActivities}
                />
            </div>
        </div>
    );
};

export default UserPermissions;