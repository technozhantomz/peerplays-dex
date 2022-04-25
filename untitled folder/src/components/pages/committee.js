import React, {Component} from "react";
import Table from "../helpers/table";
import {getCommittee} from "../../actions/getCommittee";

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
        active: []
    };

    componentDidMount() {
        getCommittee().then(e => this.setState({active: e}));
    }

    render() {
        const {active} = this.state;

        return (
            <div className="witnesses">
                <Table
                    tableHead={tableHead}
                    rows={active}
                />
            </div>
        )
    }
};

export default Committee;