import React, {Component, Fragment} from "react";
import Translate from "react-translate-component";
import Table from "../../helpers/table";
import {getCommittee} from "../../../actions/getCommittee";

const tableHead = [
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
        key: 'total_votes',
        translateTag: 'votes',
        params: 'fit-content'
    },
    {
        key: 'url',
        translateTag: 'webpage'
    }
];

class Committee extends Component {
    state = {
        active: false,
        pending: false
    };

    componentDidMount() {
        getCommittee().then(e => this.setState({
            active: e
                .filter(item => item.active)
                .map((item, index) => ({
                    ...item,
                    rank: index + 1
                })),
            pending: e
                .filter(item => !item.active)
                .map((item, index) => ({
                    ...item,
                    rank: index + 1
                }))
        }));
    }

    render() {
        const {active, pending} = this.state;

        return (
            <Fragment>
                {
                    active &&
                    <Fragment>
                        <Translate className="table__title" component="div" content={"blockchain.witnesses.active"}/>
                        <Table
                            tableHead={tableHead}
                            rows={active}
                        />
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
                    </Fragment>
                }
            </Fragment>
        )
    }
};

export default Committee;