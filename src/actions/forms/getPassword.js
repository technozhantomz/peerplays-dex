import {getCookie} from "../cookie";
import {setModal} from "../../dispatch/setModal";
import PasswordCheck from "../../components/helpers/modal/passwordCheck";
import React from "react";

export const getPassword = (fn, password = getCookie('password')) => {
    if(!password) return setModal(
        <PasswordCheck callback={ async password => getPassword(fn, password) } />
    );

    return fn(password);
};