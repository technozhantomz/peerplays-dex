import React from "react";
import {IconWarning} from "../../../../svg";
import Translate from "react-translate-component";

const ModalWarning = ({tag}) => (
    <div className="modal__warning">
        <IconWarning />
        <Translate content={`modal.${tag}.warning`} />
    </div>
);

export default ModalWarning;