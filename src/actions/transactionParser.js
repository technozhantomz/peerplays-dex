import {dbApi} from "./nodes";
import {Asset} from "../classes";
import Link from "react-router-dom/es/Link";
import React from "react";
import {clearLayout} from "../dispatch";

export const transactionParser = async (operation) => {
    let asset, info = [];

    for (let key in operation) {
        if (key === 'extensions') continue;

        let item = operation[key];
        if (!item) continue;
        if (typeof(item) === 'string') {
            if (item.match(/1\.2/)) {
                // await dbApi('get_accounts', [[item]]).then(e => console.log(e));
                let account = await dbApi('get_accounts', [[item]]).then(e => e[0].name);
                info.push({
                    key,
                    value: <Link to={`/user/${account}`}
                                 className="link_account" onClick={clearLayout}>{account}</Link>
                });
                continue;
            }
        } else if (typeof(item) === 'object') {
            if (item.amount && item.asset_id) {
                asset = await new Asset({
                    id: item.asset_id,
                    amount: item.amount
                }).getDataById();

                info.push({
                    key,
                    value: asset.toString()
                });
            } else {
                info.push({
                    key,
                    value: JSON.stringify(item)
                });
            }
            continue;
        }

        info.push({
            key,
            value: item
        });
    }

    return info;
};