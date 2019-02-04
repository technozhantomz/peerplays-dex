import React from "react";
import {IconCross, IconMore} from "../../svg";
import ActionsBtn from "./actionsBtn";
import Link from "react-router-dom/es/Link";
import {store} from "../../index";
import {removeStorageItem, setStorage} from "../../actions/storage";

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

const logout = () => {
    store.dispatch({type: 'REMOVE_ACCOUNT'});
    removeStorageItem('account');
};

const UserData = ({data}) => (
    <div className="drop-user">
        <div className="drop-user__title">
            <Link to={`/user/${data.name}`} className="drop-user__name">{data.name}</Link>
            <ActionsBtn
                actionsList={[
                    <button onClick={logout}>Logout</button>
                ]}
            />
        </div>
        <div className="drop-user__assets">
            {data.assets.map((el, id) => (
                <div key={id} className="drop-user__asset">
                    <span>{el.symbol}</span>
                    <span>{el.quantity / (10 ** el.precision)}</span>
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