import React from 'react';
import Switcher from "./switcher";
import {removeModal} from "../../dispatch/setModal";

export const MyAssetsModal = ({title}) => (
    <div className="my-assets">
        <div className="modal__header my-assets__header">
            Accounts
            <div className="my-assets__description">
                Select what account to show the activity in the widget
            </div>
        </div>
        <div className="my-assets__accounts">
            <div className="account-row">
                <span className="my-assets__name">Account Name</span>
                <Switcher/>
            </div>
            <div className="account-row">
                <span className="my-assets__name">Account Name</span>
                <Switcher/>
            </div>
            <div className="account-row">
                <span className="my-assets__name">Account Name</span>
                <Switcher/>
            </div>
            <div className="account-row">
                <span className="my-assets__name">Account Name</span>
                <Switcher/>
            </div>
        </div>
        <div className="modal__bottom">
            <div className="modal__bottom">
                <button onClick={removeModal} type="button">Cancel</button>
                <button onClick={() => console.log('accounts')} type="submit">Send</button>
            </div>
        </div>
    </div>
);
