import React from "react";
import {dbApi} from "../nodes";
import {getWitnesses} from "../getWitnesses";
import {getCommittee} from "../getCommittee";
import {Link} from "react-router-dom";
import {getWorkers} from "./getWorkers";
import {Asset} from "../../classes";
import {store} from "../../index";
import {getStore} from "../store";

const helpFunction = async (key, votes, userArray) => {
    let filterList = [], votesList = [];

    if (key === 'worker_account') {
        votes.forEach(item => {
            if(item[key]) {
                votesList.push(item['id']);
            }
        });

        return userArray
            .sort((prev, next) => next.votes - prev.votes)
            .map(user => ({
                ...user,
                vote: votesList.indexOf(user['id']) >= 0
            }))
    }

    votes.forEach(item => {
        if(item[key]) {
            votesList.push(item[key]);
        }
    });

    userArray.forEach(item => {
        if(item[key]) {
            filterList.push(item[key]);
        }
    });

    const usersList = {};
    await dbApi('get_accounts', [filterList]).then(list => list.forEach(user => { usersList[user.id] = user.name }));

    return userArray
        .sort((prev, next) => next.total_votes - prev.total_votes)
        .map(user => ({
            ...user,
            name: <Link to={`/user/${usersList[user[key]]}`} className="user__link">{usersList[user[key]]}</Link>,
            total_votes: user.total_votes,
            vote: votesList.indexOf(user[key]) >= 0
        }));
};

export const getInfoVoting = async (context) => {
    let witnesses = await getWitnesses();
    let committee = await getCommittee();
    let workers = await getWitnesses();

    const account = context.props.account ? context.props.account : context.props.data;

    const votes = account.votes;

    const fee = getStore().globalData.fees.account_update.fee;

    const asset_fee = await new Asset({id: '1.3.0', amount: fee}).getDataById();
    const update_fee = asset_fee.setPrecision();

    return {
        witness_account: await helpFunction('witness_account', votes, witnesses),
        committee_member_account: await helpFunction('committee_member_account', votes, committee),
        worker_account: await helpFunction('worker_account', votes, workers),
        update_fee
    };
};