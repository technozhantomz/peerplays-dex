import React, {Fragment} from 'react';
import LocalLogin from "../../login/localLogin";
import {handleLogin} from "../../../../actions/forms/login/index";
import ModalTitle from "../decoration/modalTitle";

const RestoreFromBin = () => (
    <Fragment>
        <ModalTitle tag="binRestore" />
        <LocalLogin handleLogin={handleLogin} />
    </Fragment>
);

export default RestoreFromBin;