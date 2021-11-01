import React from 'react'
import {getPassword} from "./index";
import DepositModal from "../../components/helpers/modal/content/depositModal";
import {setModal} from "../../dispatch/layoutDispatch";
import {getAccountData} from "../store";

export const dispatchDepositModal = (defaultToken = '', defaultTo = '') => getPassword(password => setModal(
    <DepositModal
        password={password}
        defaultFrom={getAccountData().name}
        defaultTo={defaultTo}
        defaultToken={defaultToken}
    />
));
