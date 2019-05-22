import React from "react";
import {setModal} from "../../dispatch";
import RestoreFromBin from "../../components/helpers/modal/content/restoreFromBin";
import RestoreFromBrain from "../../components/helpers/modal/content/restoreFromBrain";

export const restoreFromBin = () => setModal(<RestoreFromBin />);
export const restoreFromBrain = () => setModal(<RestoreFromBrain />);