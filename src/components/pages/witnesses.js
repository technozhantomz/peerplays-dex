import React, {Component} from "react";
import {getWitnesses} from "../../actions/getWitnesses";
import Table from "../helpers/table";

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
        key: 'total_missed',
        translateTag: 'missingBlock'
    },
    {
        key: 'total_votes',
        translateTag: 'votes',
        params: 'align-center fit-content content-padding'
    },
    {
        key: 'signing_key',
        translateTag: 'key',
        params: 'align-center fit-content content-padding'
    }
];


class Witnesses extends Component {
    state = {
        active: []
    };

    componentDidMount() {
        getWitnesses().then(e => this.setState({active: e}));
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

export default Witnesses;