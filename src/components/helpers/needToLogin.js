import React from "react";
import CreateUser from "./modal/content/createUser";
import Translate from "react-translate-component";
import {IconLogin} from "../../svg";
import {setModal} from "../../dispatch/layoutDispatch";
import Button from "./buttons/button";

const NeedToLogin = ({pageName, image = <IconLogin />}) => (
    <div className="login-needed">
        {image && <div className="login-needed__image">{image}</div>}
        <Translate content="emptyPage.login" className="login-needed__text" pageName={<Translate content={`${pageName}.title`} />} />
        <Button tag="createAccount" className="btn--round" onClick={() => setModal(<CreateUser />)} />
    </div>
);

export default NeedToLogin;