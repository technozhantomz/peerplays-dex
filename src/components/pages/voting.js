import React, { Component, useEffect, useState } from 'react';
import { NavLink, Route, Switch } from "react-router-dom";
import Translate from "react-translate-component";
import VotingPage from "./voting/votingPage";
import VotingWorkers from "./voting/votingWorkers";
import { connect } from "react-redux";
import NeedToLogin from "../helpers/needToLogin";
import { getInfoVoting } from "../../actions/voting/getInfoVoting";
import dataFetch from "../helpers/dataFetch";
import SaveChangesCard from "../helpers/saveChangesCard";
import { getPassword, updateAccount } from "../../actions/forms";
import { dbApi } from "../../actions/nodes";
import { clearVotes } from "../../dispatch/votesDispatch";
import { getAccountData } from "../../actions/store";
import VestGPOS from './voting/VestGPOS';
import WithdrawGPOS from './voting/WithdrawGPOS';
import { getAsset } from '../../actions/assets/getAsset';
import { Grid } from '@material-ui/core';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const tableHeadWitnesses = [
    {
        key: 'rank',
        translateTag: 'hash',
        params: 'fit-content'
    },
    {
        key: 'name',
        translateTag: 'name',
        params: 'fit-content bold'
    },
    {
        key: 'url',
        translateTag: 'url',
        params: 'fit-content'
    },
    {
        key: 'last_confirmed_block_num',
        translateTag: 'lastBlock',
        params: 'fit-content'
    },
    {
        key: 'total_votes',
        translateTag: 'votes',
        params: 'align-right fit-content'
    },
    {
        key: 'vote_icon',
        params: 'align-center fit-content content-padding'
    }
];

const tableHeadCommittee = tableHeadWitnesses.filter(elem => elem.translateTag !== 'lastBlock');

const votingMenu = [
    /*{
        link: '/',
        tag: 'workers',
        render: (account, voteList) => <VotingWorkers account={account} votes={voteList['worker_account']}
                                                      list="workers"/>
    },*/
    {
        link: '/',
        tag: 'witnesses',
        render: (account, voteList, cancelVotes, hooks) => <VotingPage params="witness_account" tableHead={tableHeadWitnesses}
            account={account} votes={voteList['witness_account']}
            list="witnesses" cancelVotes={cancelVotes} hooks={hooks} />
    },
    {
        link: '/committee',
        tag: 'committee',
        render: (account, voteList, cancelVotes, hooks) => <VotingPage params="committee_member_account" tableHead={tableHeadCommittee}
            account={account} votes={voteList['committee_member_account']}
            list="committee" cancelVotes={cancelVotes} hooks={hooks} />
    },
    {
        link: '/son',
        tag: 'son',
        render: (account, voteList, cancelVotes, hooks) => <VotingPage params="son_account" tableHead={tableHeadCommittee}
            account={account} votes={voteList['son_account']}
            list="son" cancelVotes={cancelVotes} hooks={hooks} />
    }
];

const Voting = (props) => {
    const { account, votes } = props;
    const [totalGpos, setTotalGpos] = useState(0);
    const [availableGpos, setAvailableGpos] = useState(0);
    const [precision, setPrecision] = useState(0);
    const [symbol, setSymbol] = useState("");
    const [symbol_id, setSymbol_id] = useState("");
    const [cancelVotes, setCancelVotes] = useState(false);
    const [newVotes, setNewVotes] = useState(props.account.votes.map(el => el.vote_id));
    const getAssets = () => {
        let user = getAccountData();
        dbApi('get_gpos_info', [user.id]).then((gposInfo) => {
            getAsset(gposInfo.award.asset_id).then((asset) => {
                setTotalGpos(gposInfo.account_vested_balance / (10 ** asset.precision));
                setAvailableGpos(gposInfo.allowed_withdraw_amount / (10 ** asset.precision));
                setSymbol(asset.symbol);
                setSymbol_id(gposInfo.award.asset_id);
                setPrecision(asset.precision);
            });
        });
    }
    useEffect(() => {
        getAssets();
    }, []);

    useEffect(() => {
        setNewVotes(props.account.votes.map(el => el.vote_id))
    }, [props.account])
    const saveResult = (password) => {
        let user = getAccountData();
        dbApi('get_account_by_name', [user.name]).then(e => {
            const currentVotes = [...newVotes, ...votes];
            let new_options = e.options;
            new_options.votes = currentVotes.sort((a, b) => {
                const aSplit = a.split(':');
                const bSplit = b.split(':');

                return parseInt(aSplit[1], 10) - parseInt(bSplit[1], 10);
            });
            new_options.num_witness = currentVotes.filter((vote) => parseInt(vote.split(':')[0]) === 1).length;
            new_options.num_committee = currentVotes.filter((vote) => parseInt(vote.split(':')[0]) === 0).length;
            new_options.num_son = currentVotes.filter((vote) => parseInt(vote.split(':')[0]) === 3).length;
            updateAccount({ new_options, extensions: { value: { update_last_voting_time: true } } }, password).then(() => {
                clearVotes();
            });
        });
    };
    const reset = () => {
        setCancelVotes(true);
        setNewVotes(props.account.votes.map(el => el.vote_id))
        clearVotes();
        setTimeout(() => {
            setCancelVotes(false);
        });
    };

    const handleSave = () => {
        let user = getAccountData();
        if (user.assets[0].amount / 100000 < 20) {
            return toast.error('Insufficient test balance.')
        }
        if (totalGpos > 0) {
            getPassword(saveResult)

        } else {
            toast.error('You need to Vest some GPOS balance first')
        }
    };
    if (!account) return <NeedToLogin tag={'empty.login'} />;
    return (
        <div className="container page">
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <VestGPOS symbol_id={symbol_id} symbol={Symbol} precision={precision} totalGpos={totalGpos} getAssets={getAssets} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <WithdrawGPOS symbol_id={symbol_id} symbol={symbol} precision={precision} totalGpos={totalGpos} availableGpos={availableGpos} getAssets={getAssets} />
                    </Grid>
                </Grid>
            </div>
            <div className="page__header-wrapper">
                <Translate className="page__title" component="h1" content="voting.title" />
            </div>
            <div className="page__menu">
                {
                    votingMenu.map((el, id) => (
                        <Translate
                            key={id}
                            content={`voting.${el.tag}.title`}
                            component={NavLink}
                            to={`/voting${el.link}`}
                            className="page__menu-item"
                            exact
                        />
                    ))
                }
            </div>
            <div className="page__content voting__content">
                <Switch>
                    {
                        votingMenu.map((el, id) => (
                            <Route
                                key={id}
                                path={`/voting${el.link}`}
                                render={() => el.render(account, props.data, cancelVotes, { setNewVotes, newVotes })}
                                exact
                            />
                        ))
                    }
                </Switch>
            </div>
            <SaveChangesCard
                show={newVotes.length !== props.account.votes.length}
                fee={props.data.update_fee}
                cancelFunc={reset}
                saveFunc={handleSave}
            />
            <ToastContainer />
        </div>
    )
}


const mapStateToProps = (state) => ({ account: state.accountData, votes: state.votes });
const voteWithData = dataFetch({ method: getInfoVoting })(Voting);

export default connect(mapStateToProps)(voteWithData);
