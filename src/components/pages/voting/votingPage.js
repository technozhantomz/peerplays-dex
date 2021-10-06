import React, {Component, Fragment} from "react";
import Translate from "react-translate-component";
import {IconCheckBlue} from "../../../svg";
import Table from "../../helpers/table";
import {setVotes} from "../../../dispatch/votesDispatch";
import {getStore} from "../../../actions/store";
import TableCard from "../../helpers/cards";

class VotingPage extends Component {
    state = {
        active: false,
        pending: false,
        voteList: []
    };

    buttons = (id) => ({
        toVote: <button onClick={() => this.addToVote(id)}><IconCheckBlue className="vote__like"/></button>,
        fromVote: <button onClick={() => this.removeFromVote(id)}><IconCheckBlue className="mask vote__like"/></button>
    });

    formatVote = (array, voteList) => {
        return array.map((item, index) => ({
            ...item,
            rank: index + 1,
            vote_icon: this.buttons(item.vote_id)[voteList.find(elem => elem === item.vote_id) ? 'fromVote' : 'toVote']
        }))
    };

    addToVote = (id) => {
        this.setState((state, props) => {
            let voteList = state.voteList;
            voteList.push(id);
            setVotes([...voteList]);
            return {
                voteList,
                active: this.formatVote(state.active, voteList),
                pending: this.formatVote(state.pending, voteList)
            }
        });
    };

    removeFromVote = (id) => {
        this.setState((state, props) => {
            let voteList = state.voteList.filter(item => item !== id);
            setVotes([...voteList]);
            return {
                voteList,
                active: this.formatVote(state.active, voteList),
                pending: this.formatVote(state.pending, voteList)
            }
        });
    };

    componentDidMount() {
        const {params, account, votes} = this.props;
        let newList = getStore().votes;
        let list = newList.length ? newList : account.votes.map(item => item.vote_id || item.vote_for);

        this.setState({
            voteList: list,
            active: this.formatVote(votes.filter(item => item.active), list),
            pending: this.formatVote(votes.filter(item => !item.active), list)
        });
    }

    render() {
        const {active, pending} = this.state;
        const {tableHead} = this.props;

        return (
            <div className="voting__table">
                {
                    active &&
                    <Fragment>
                        <Translate className="table__title" component="div" content={"blockchain.witnesses.active"}/>
                        <Table
                            tableHead={tableHead}
                            rows={active}
                        />
                        <TableCard rows={active} tableHead={tableHead}/>
                    </Fragment>
                }

                {
                    pending &&
                    <Fragment>
                        <Translate className="table__title" component="div" content={"blockchain.witnesses.pending"}/>
                        <Table
                            tableHead={tableHead}
                            rows={pending}
                        />
                        <TableCard rows={pending} tableHead={tableHead}/>
                    </Fragment>
                }
            </div>
        )
    }
}

export default VotingPage;