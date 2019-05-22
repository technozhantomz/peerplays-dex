import React, {Component, Fragment} from 'react';
import {getWorkers} from "../../../actions/voting/getWorkers";
import Table from "../../helpers/table";

const tableHeadWorkers = [
    {
        key: 'rank',
        translateTag: 'hash',
        params: 'fit-content'
    },
    {
        key: 'id',
        translateTag: 'id',
        params: 'fit-content'
    },
    {
        key: 'name',
        translateTag: 'name_description',
        params: ''
    },
    {
        key: 'votes',
        translateTag: 'votes',
        params: 'fit-content'
    },
    {
        key: 'duration',
        translateTag: 'duration',
        params: 'fit-content'
    },
    {
        key: 'url',
        translateTag: 'url',
        params: 'fit-content'
    },
    {
        key: 'daily_pay',
        translateTag: 'daily_pay',
        params: 'fit-content'
    }
];

class Workers extends Component {
    state = {
        workers: false
    };

    componentDidMount() {
        getWorkers().then(e => this.setState({
            workers: e
                .sort((prev, next) => Number(next.votes) - Number(prev.votes))
                .map((item, index) => ({
                ...item,
                rank: index + 1
            }))
        }));
    }

    render() {
        const {workers} = this.state;

        return (
            <Fragment>
                {
                    workers &&
                    <Table
                        tableHead={tableHeadWorkers}
                        rows={workers}
                    />
                }
            </Fragment>
        )
    }
}

export default Workers;