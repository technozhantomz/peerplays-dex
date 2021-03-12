import React, {Fragment} from 'react';
import BrainLogin from "../../login/brainLogin";
import {handleLogin} from "../../../../actions/forms/login/index";
import ModalTitle from "../decoration/modalTitle";

const RestoreFromBrain = () => (
    <Fragment>
        <ModalTitle tag="brainRestore" />
        <BrainLogin handleLogin={handleLogin} />
    </Fragment>
);

export default RestoreFromBrain;