import React from "react";
import {dbApi} from "./nodes";

export const setAssets = async (el) => {
    let precision = await dbApi('get_assets', [[el.asset]]).then(e => e[0].precision);
    return el.quantity / (10 ** precision);
};