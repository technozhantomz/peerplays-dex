import React from "react";
import {dbApi} from "./nodes";
import {Link} from "react-router-dom";
import {setAssets} from "./setAssets";
import {IconLink} from "../svg";

export const getSON = async () => {
    const sonID = await dbApi('lookup_son_accounts', ['', 100]).then(e => e);
    const activeUsers = await dbApi('get_global_properties').then(e => e);

    return await dbApi('get_sons', [sonID.map(item => item[1])]).then(async e => {
        let allSON = e
            .map(async (item) => ({
                ...item,
                url: item.url.length ? <Link to={item.url} className="link"><IconLink/></Link> : '',
                name: <Link to={`/user/${sonID.filter(name => name[1] === item.id)[0][0]}`}
                            className="user__link">{sonID.filter(name => name[1] === item.id)[0][0]}</Link>,
                total_votes: (await setAssets({quantity: Number(item.total_votes), asset: '1.3.0'}))
            }));

        allSON = await Promise.all(allSON);

        return allSON.map(item => ({
            ...item,
            active: activeUsers['active_sons'].indexOf(item.id) >= 0
        }));
    });
};