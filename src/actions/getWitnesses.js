import React from "react";
import {dbApi} from "./nodes";
import {Link} from "react-router-dom";
import {IconLink} from "../svg";
import {setAssets} from "./setAssets";

export const getWitnesses = async () => {
    let activeWitnesses = [],
        witnessesID = [];

    activeWitnesses = await dbApi('get_global_properties').then(e => e['active_witnesses']);
    witnessesID = await dbApi('lookup_witness_accounts', ['', 100]).then(e => e);

    return await dbApi('get_witnesses', [witnessesID.map(item => item[1])]).then(async e => {

        // const witnesses = e.map(item => ({
        //     ...item,
        //     url: item.url.length ? <Link to={item.url}>icon</Link> : '',
        //     name: witnessesID.filter(name => name[1] === item.id)[0][0]
        // }));

        let active = e
            .filter(item => activeWitnesses.find(activeItem => activeItem === item.id))
            .map(async (item, index) => ({
                ...item,
                rank: index + 1,
                url: item.url.length ? <Link to={item.url}><IconLink/></Link> : '',
                name: witnessesID.filter(name => name[1] === item.id)[0][0],
                signing_key: <Link to={item.signing_key}><IconLink/></Link>,
                total_votes: await setAssets({quantity: Number(item.total_votes), asset: '1.3.0'})
            }));

        active = await Promise.all(active);

        // const reserved = witnesses
        //     .filter(item => active.indexOf(item) < 0).map((item, index) => ({
        //         ...item,
        //         rank: index + 1
        //     }));

        console.log('active');
        console.log(active);
        // console.log('reserved');
        // console.log(reserved);

        return active;
    });
};