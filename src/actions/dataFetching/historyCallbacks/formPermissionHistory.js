import {getUserName} from "../../account";
import {Link} from "react-router-dom";
import {assetToString} from "../../assets";
import React from "react";
import ActionsBtn from "../../../components/helpers/buttons/actionsBtn";
import {dbApi} from "../../nodes";

export const formPermissionHistory = history => Promise.all(history.map(async el => {
    const {account, fee} = el.op[1];

    const timestamp = await dbApi('get_block_header', [el.block_num]).then(block => {
        const date = new Date(block.timestamp);
        const arr = String(date).split(' ');
        return [arr[2], arr[1], arr[3]].join(' ');
    });

    const acc = await getUserName(account);

    return {
        id: el.id,
        type: <button className="operation positive">Account update</button>,
        desc: `${acc} updated their account data`,
        fee: await assetToString(fee),
        time: timestamp,
        actions: <div className="actions__wrapper">
            <ActionsBtn
                actionsList={[
                    <button>Reset Settings</button>,
                    <button>Body 2</button>,
                    <button>Body 2</button>
                ]}
            />
        </div>
    };
}));