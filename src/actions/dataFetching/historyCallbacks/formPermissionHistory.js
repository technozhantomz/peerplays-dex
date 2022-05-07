import {getUserName} from "../../account";
import {assetToString} from "../../assets";
import React from "react";
import {dbApi} from "../../nodes";
import Translate from "react-translate-component";

export const formPermissionHistory = history => Promise.all(history.map(async el => {
    const {account, fee} = el.op[1];

    const timestamp = await dbApi('get_block_header', [el.block_num]).then(block => {
        const date = new Date(block.timestamp);
        const arr = String(date).split(' ');
        return [arr[2], arr[1], arr[3]].join(' ');
    });

    const user = await getUserName(account);

    return {
        id: el.id,
        type: <Translate content={"tableInfo.account_update.title"} component="a" className="operation positive"/>,
        desc: <Translate content={"tableInfo.account_update.description"} with={{user}}/>,
        fee: await assetToString(fee),
        time: timestamp
    };
}));