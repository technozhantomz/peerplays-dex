import React, {Fragment} from "react";
import Tabs from "../../tabs/tabs";
import CloudLogin from "../../login/cloudLogin";
import LocalLogin from "../../login/localLogin";
import BrainLogin from "../../login/brainLogin";
import {handleLogin} from "../../../../actions/forms/login/index";
import ModalTitle from "../decoration/modalTitle";

const LogIn = () => (
    <Fragment>
        <ModalTitle tag="login" />
        <Tabs head={['cloud', 'local', 'brain']} headType="radioHead">
            <CloudLogin handleLogin={handleLogin} />
            <LocalLogin handleLogin={handleLogin} />
            <BrainLogin handleLogin={handleLogin} />
        </Tabs>
    </Fragment>
);

export default LogIn;