import React from "react";
import {IconCross, IconMore} from "../../svg";

const userAssets = [
    {
        name: 'BTS',
        quantity: 3320.56
    },
    {
        name: 'UTDEV',
        quantity: 234876.2500
    },
    {
        name: 'UTDEV',
        quantity: 234876.2500
    },
    {
        name: 'UTDEV',
        quantity: 234876.2500
    },
    {
        name: 'UTDEV',
        quantity: 234876.2500
    },
    {
        name: 'UTDEV',
        quantity: 234876.2500
    }
];

const userWallets = [
    {
        name: 'Account-Name',
        asset: {
            quantity: '23,234.345567',
            name: 'bitUSD'
        }
    },
    {
        name: 'Account-Name',
        asset: {
            quantity: '23,234.345567',
            name: 'bitUSD'
        }
    },
    {
        name: 'Account-Name',
        asset: {
            quantity: '23,234.345567',
            name: 'bitUSD'
        }
    }
];

const UserData = () => (
    <div className="drop-user">
        <div className="drop-user__title">
            <h2 className="drop-user__name">Timber-Steam</h2>
            <IconMore />
        </div>
        <div className="drop-user__assets">
            {userAssets.map((el, id) => (
                <div key={id} className="drop-user__asset">
                    <span>{el.name}</span>
                    <span>{el.quantity}</span>
                </div>
            ))}
        </div>
        <div className="drop-user__btn-wrapper">
            <button className="btn-round btn-round--light-blue">Send funds</button>
            <button className="btn-round btn-round--grey">Deposit</button>
        </div>
        <h3 className="drop-user__wallets-title">Switch account</h3>
        <div className="drop-user__wallets">
            {
                userWallets.map((el, id) => (
                    <div key={id} className="drop-user__wallet">
                        <h4 className="drop-user__wallet-name">{el.name}</h4>
                        <span className="drop-user__wallet-quantity">{el.asset.quantity} {el.asset.name}</span>
                    </div>
                ))
            }
        </div>
        <button className="btn-round btn-round--light-blue drop-user__add">
            <IconCross />
        </button>
    </div>
);

export default UserData;