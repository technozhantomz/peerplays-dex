import React, {Component} from 'react';
import {NavLink, Route, Switch} from "react-router-dom";
import Translate from "react-translate-component";
import VotingPage from "./voting/votingPage";
import VotingWorkers from "./voting/votingWorkers";
import {connect} from "react-redux";
import NeedToLogin from "../helpers/needToLogin";
import {getInfoVoting} from "../../actions/voting/getInfoVoting";
import dataFetch from "../helpers/dataFetch";
import SaveChangesCard from "../helpers/saveChangesCard";
import {getPassword, updateAccount} from "../../actions/forms";
import {getStorage} from "../../actions/storage";
import {dbApi} from "../../actions/nodes";
import {clearVotes} from "../../dispatch/votesDispatch";
import {getAccountData} from "../../actions/store";

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
    {
        link: '/',
        tag: 'workers',
        render: (account, voteList) => <VotingWorkers account={account} votes={voteList['worker_account']}
                                                      list="workers"/>
    },
    {
        link: '/witnesses',
        tag: 'witnesses',
        render: (account, voteList) => <VotingPage params="witness_account" tableHead={tableHeadWitnesses}
                                                   account={account} votes={voteList['witness_account']}
                                                   list="witnesses"/>
    },
    {
        link: '/committee',
        tag: 'committee',
        render: (account, voteList) => <VotingPage params="committee_member_account" tableHead={tableHeadCommittee}
                                                   account={account} votes={voteList['committee_member_account']}
                                                   list="committee"/>
    }
];

class Voting extends Component {
    saveResult = (password) => {
        let user = getAccountData();
        dbApi('get_account_by_name', [user.name]).then(e => {
            let new_options = e.options;
            new_options.votes = this.props.votes;
            updateAccount({new_options}, password).then(clearVotes)
        })
    };

    handleSave = () => getPassword(this.saveResult);

    render() {
        if (!this.props.account) return <NeedToLogin tag={'empty.login'}/>;

        return (
            <div className="container page">
                <div className="page__header-wrapper">
                    <h1 className="page__title">Voting</h1>
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
                <div className="page__content">
                    <Switch>
                        {
                            votingMenu.map((el, id) => (
                                <Route
                                    key={id}
                                    path={`/voting${el.link}`}
                                    render={() => el.render(this.props.account, this.props.data)}
                                    exact
                                />
                            ))
                        }
                    </Switch>
                </div>
                <SaveChangesCard
                    show={this.props.votes && this.props.votes.length}
                    fee={this.props.data.update_fee}
                    cancelFunc={this.reset}
                    saveFunc={this.handleSave}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({account: state.accountData, votes: state.votes});
const voteWithData = dataFetch({method: getInfoVoting})(Voting);

export default connect(mapStateToProps)(voteWithData);
