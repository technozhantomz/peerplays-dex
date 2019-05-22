import React, {Component, Fragment} from "react";
import {getWitnesses} from "../../../actions/getWitnesses";
import Table from "../../helpers/table";
import {Card} from "../../helpers/card";

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
        params: 'align-right fit-content'
    },
    {
        key: 'signing_key',
        translateTag: 'key',
        params: 'align-center fit-content content-padding'
    }
];


class Witnesses extends Component {
    state = {
        active: false,
        pending: false
    };

    componentDidMount() {
        getWitnesses().then(e =>
            this.setState({
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
            })
        );
    }

    render() {
        const {active, pending} = this.state;

        return (
            <div className="witnesses">
                <div className="card__list">
                    <Card mode="witnesses">
                        <div className="card__title">
                            Current Witness
                        </div>
                        <div className="card__content">
                            delegate.freedom
                        </div>
                    </Card>
                    <Card mode="witnesses">
                        <div className="card__title">
                            Active Witnesses
                        </div>
                        <div className="card__content">
                            {active.length}
                        </div>
                    </Card>
                    <Card mode="witnesses">
                        <div className="card__title">
                            Participation
                        </div>
                        <div className="card__content">
                            98%
                        </div>
                    </Card>
                    <Card mode="witnesses">
                        <div className="card__title">
                            Pay-per-block
                        </div>
                        <div className="card__content">
                            1.00000 BTS
                        </div>
                    </Card>
                    <Card mode="witnesses">
                        <div className="card__title">
                            Remaining budget
                        </div>
                        <div className="card__content">
                            1.00000 BTS
                        </div>
                    </Card>
                    <Card mode="witnesses">
                        <div className="card__title">
                            Next vote update
                        </div>
                        <div className="card__content">
                            10 minutes
                        </div>
                    </Card>
                </div>

                {
                    active &&
                    <Fragment>
                        <div className="table__title">
                            Active
                        </div>
                        <Table
                            tableHead={tableHead}
                            rows={active}
                        />
                    </Fragment>
                }

                {
                    pending &&
                    <Fragment>
                        <div className="table__title">
                            Pending
                        </div>
                        <Table
                            tableHead={tableHead}
                            rows={pending}
                        />
                    </Fragment>
                }
            </div>
        )
    }
}

export default Witnesses;