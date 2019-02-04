import React from "react";
import {dbApi} from "./nodes";
import {Link} from "react-router-dom";
import {setAssets} from "./setAssets";

export const getCommittee = async () => {
    let activeCommittee = [],
        committeeID = [];

    activeCommittee = await dbApi('get_global_properties').then(e => e['active_committee_members']);
    committeeID = await dbApi('lookup_committee_member_accounts', ['', 100]).then(e => e);

    return await dbApi('get_committee_members', [committeeID.map(item => item[1])]).then(async e => {

        // const committee = e.map(item => ({
        //     ...item,
        //     name: committeeID.filter(name => name[1] === item.id)[0][0]
        // }));

        let active = e
            .filter(item => activeCommittee.find(activeItem => activeItem === item.id))
            .map(async (item, index) => ({
                ...item,
                rank: index + 1,
                name: committeeID.filter(name => name[1] === item.id)[0][0],
                url: item.url.length ? <Link to={item.url} className="link">{item.url}</Link> : '',
                total_votes: await setAssets({quantity: Number(item.total_votes), asset: '1.3.0'})
            }));
        // const reserved = committee.filter(item => active.indexOf(item) < 0);
        active = await Promise.all(active);

        return active;

        // return {
        //     active: sort(active),
        //     reserved: sort(reserved)
        // }
    });
};