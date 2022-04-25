import React from "react";
import {getPassword} from "./index";
import SendModal from "../../components/helpers/modal/content/sendModal";
import {setModal} from "../../dispatch/layoutDispatch";
import {getAccountData} from "../store";

export const dispatchSendModal = (defaultToken = '', defaultTo = '') => getPassword(password => setModal(
    <SendModal
        password={password}
        defaultFrom={getAccountData().name}
        defaultTo={defaultTo}
        defaultToken={defaultToken}
    />
));