import React from 'react';
import Switcher from "../../switcher";
import Close from "../decoration/close";
import ModalTitle from "../decoration/modalTitle";
import ModalButton from "../../buttons/modalButton";

export const MyAssetsModal = ({title}) => (
    <div className="my-assets">
        <ModalTitle tag="accounts" subtitle={true} />
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
                <Close />
                <ModalButton tag="send" onClick={() => console.log('accounts')} />
            </div>
        </div>
    </div>
);
