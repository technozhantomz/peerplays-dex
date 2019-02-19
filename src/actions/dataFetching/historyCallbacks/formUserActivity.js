import {getUserName} from "../../account/getUserName";
import {assetToString} from "../../assets";
import {dbApi} from "../../nodes";
import {Link} from "react-router-dom";
import React from "react";
import ActionsBtn from "../../../components/helpers/actionsBtn";

export const formUserActivity = history => Promise.all(history.map(async el => {
    const {from, to, amount, fee} = el.op[1];
    const timestamp = await dbApi('get_block_header', [el.block_num]).then(block => {
        const date = new Date(block.timestamp);
        const arr = String(date).split(' ');
        return [arr[2], arr[1], arr[3]].join(' ');
    });
    const sender = await getUserName(from);
    const receiver = await getUserName(to);
    return {
        id: el.id,
        type: <Link to={`/blocks/${el.id}`} className="operation positive">Transaction</Link>,
        sender: <Link to={`/user/${sender}`}>{sender}</Link>,
        receiver: <Link to={`/user/${receiver}`}>{receiver}</Link>,
        quantity: await assetToString(amount),
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