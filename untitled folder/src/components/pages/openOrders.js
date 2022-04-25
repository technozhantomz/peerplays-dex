import React from "react";
import ActionsBtn from "../helpers/actionsBtn";
import Table from "../helpers/table";

const assets = [
    {
        trade: 'Asset Name',
        order: '12312313123',
        description: '0.00000000',
        price: 'ХХХ,ХХХ.ХХХХХХХ',
        market: 'ХХХ,ХХХ.ХХХХХХХ',
        value: 'ХХХ,ХХХ.ХХХХХХХ'
    },
    {
        trade: 'Asset Name',
        order: '12312313123',
        description: '0.00000000',
        price: 'ХХХ,ХХХ.ХХХХХХХ',
        market: 'ХХХ,ХХХ.ХХХХХХХ',
        value: 'ХХХ,ХХХ.ХХХХХХХ'
    },
    {
        trade: 'Asset Name',
        order: '12312313123',
        description: '0.00000000',
        price: 'ХХХ,ХХХ.ХХХХХХХ',
        market: 'ХХХ,ХХХ.ХХХХХХХ',
        value: 'ХХХ,ХХХ.ХХХХХХХ'
    },
    {
        trade: 'Asset Name',
        order: '12312313123',
        description: '0.00000000',
        price: 'ХХХ,ХХХ.ХХХХХХХ',
        market: 'ХХХ,ХХХ.ХХХХХХХ',
        value: 'ХХХ,ХХХ.ХХХХХХХ'
    },
    {
        trade: 'Asset Name',
        order: '12312313123',
        description: '0.00000000',
        price: 'ХХХ,ХХХ.ХХХХХХХ',
        market: 'ХХХ,ХХХ.ХХХХХХХ',
        value: 'ХХХ,ХХХ.ХХХХХХХ'
    },
    {
        trade: 'Asset Name',
        order: '12312313123',
        description: '0.00000000',
        price: 'ХХХ,ХХХ.ХХХХХХХ',
        market: 'ХХХ,ХХХ.ХХХХХХХ',
        value: 'ХХХ,ХХХ.ХХХХХХХ'
    },
    {
        trade: 'Asset Name',
        order: '12312313123',
        description: '0.00000000',
        price: 'ХХХ,ХХХ.ХХХХХХХ',
        market: 'ХХХ,ХХХ.ХХХХХХХ',
        value: 'ХХХ,ХХХ.ХХХХХХХ'
    },
    {
        trade: 'Asset Name',
        order: '12312313123',
        description: '0.00000000',
        price: 'ХХХ,ХХХ.ХХХХХХХ',
        market: 'ХХХ,ХХХ.ХХХХХХХ',
        value: 'ХХХ,ХХХ.ХХХХХХХ'
    }
];

const tableHead = [
    {
        key: 'trade',
        translateTag: 'trade'
    },
    {
        key: 'order',
        translateTag: 'orderID',
        params: 'fit-content'
    },
    {
        key: 'description',
        translateTag: 'description',
    },
    {
        key: 'price',
        translateTag: 'price',
        params: 'fit-content'
    },
    {
        key: 'market',
        translateTag: 'marketPrice',
        params: 'fit-content'
    },
    {
        key: 'value',
        translateTag: 'value',
    },
    {
        key: 'actions',
        params: 'actions'
    }
];

const UserAssets = () => {

    const newAssets = [...assets].map((el) => ({...el, ...{
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

export default UserAssets;