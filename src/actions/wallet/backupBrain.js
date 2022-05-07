import React from "react";
import {getPassword} from "../forms";
import {setModal} from "../../dispatch";
import {getLoginData} from "../store";
import BrainkeyModal from "../../components/helpers/modal/content/brainkeyModal";

export const backupBrain = () => getPassword(password => {
    const wallet = getLoginData();
    setModal(<BrainkeyModal brainkey={wallet.decryptBrain(password)} />);
    wallet.onModify('brainkey');
});