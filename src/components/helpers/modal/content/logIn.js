import React, {Fragment} from "react";
import CloudLogin from "../../login/cloudLogin";
import {handleLogin} from "../../../../actions/forms/login/index";
import ModalTitle from "../decoration/modalTitle";

const LogIn = () => (
    <Fragment>
        <ModalTitle tag="login" />
        <CloudLogin handleLogin={handleLogin} />
    </Fragment>
);

export default LogIn;