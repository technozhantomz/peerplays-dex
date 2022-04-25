import React from "react";
import {getPassword} from "./index";
import GenerateAddress from "../../components/helpers/modal/content/generateAddress";
import {setModal} from "../../dispatch/layoutDispatch";

export const dispatchGenerateAddress = (sidechain = '') => getPassword(password => setModal(
    <GenerateAddress
        password={password}
        sidechain={sidechain}
    />
));