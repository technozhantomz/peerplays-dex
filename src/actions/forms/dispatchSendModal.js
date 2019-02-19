import React from "react";
import {getStorage} from "../storage";
import {getPassword} from "./index";
import {setModal} from "../../dispatch/setModal";
import SendModal from "../../components/helpers/modal/sendModal";

export const dispatchSendModal = (defaultToken = '') => getPassword(password => setModal(
    <SendModal
        password={password}
        defaultFrom={getStorage('account').name}
        defaultToken={defaultToken}
    />
));