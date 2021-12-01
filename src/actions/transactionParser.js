import {dbApi} from "./nodes";
import {Asset} from "../classes";
import Link from "react-router-dom/es/Link";
import React from "react";
import {clearLayout} from "../dispatch";
import { Aes } from "peerplaysjs-lib";
import { getStore } from "./store";

export const transactionParser = async (operation, password = '') => {
    let asset, info = [];

    for (let key in operation) {
        if (key === 'extensions') continue;

        let item = operation[key];
        if (!item) continue;

        if (key === 'memo') {
            const message = item.message;
            let value;
            if (message.slice(0, 8) === "00000000") {

                value = (Buffer.from(message.slice(8), 'hex')).toString()

            } else {
                const {loginData, accountData} = getStore();
                const fromAccount = await dbApi('get_account_by_name',[accountData.name]);
                let publicKey = item.from;
    
                if (accountData.id === operation.from) {
                    publicKey = item.to;
                }

                let memoFromPrivkey;
                if(fromAccount.options.memo_key === fromAccount.active.key_auths[0][0]) {
                    memoFromPrivkey = loginData.formPrivateKey(password, 'active');
                } else {
                    memoFromPrivkey = loginData.formPrivateKey(password, 'memo');
                }
                try {
                    value = (Aes.decrypt_with_checksum(memoFromPrivkey, publicKey, item.nonce, message)).toString();
                } catch (e) {
                    console.error('Could not decode message.');
                }
            }
            info.push({
                key: "memo",
                value
            })
            continue;
        }

        if (typeof(item) === 'string') {
            if (item.match(/1\.2/)) {
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
