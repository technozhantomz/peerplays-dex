import React, {Fragment} from 'react';
import {copyText} from "../../../../actions/copyText";
import ModalTitle from "../decoration/modalTitle";
import Close from "../decoration/close";
import Button from "../../buttons/button";

const BrainkeyModal = ({brainkey}) => (
    <Fragment>
        <ModalTitle tag="showBrain" />
        <div className="modal__body">
            {brainkey}
        </div>
        <div className="modal__bottom">
            <Close tag="close" />
            <Button tag="copyBrain" onClick={() => copyText("modal__body")} className="modal__button" />
        </div>
    </Fragment>
);

export default BrainkeyModal