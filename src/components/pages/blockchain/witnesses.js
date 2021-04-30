import React, {Component, Fragment} from "react";
import Translate from "react-translate-component";
import {getWitnesses} from "../../../actions/getWitnesses";
import Table from "../../helpers/table";
import {Card} from "../../helpers/card";
import { updateAllBlockchainData } from '../../../actions/dataFetching/getGlobalData';

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
        updateAllBlockchainData().then(data => this.setState({
          blockchainData: data
        }));
        this.timerID = setInterval(() => updateAllBlockchainData().then(data => this.setState({
            blockchainData: data
          })), 3000);
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

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const {active, pending, blockchainData} = this.state;
        const currentWitness = active && blockchainData ? active.find(e => e.id === blockchainData.current_witness) : {name: ''};

        return (
            <div className="witnesses">
                <div className="card__list">
                    <Card mode="witnesses">
                        <Translate className="card__title" component="div" content={"blockchain.blockchain.active_witnesses"}/>
                        <div className="card__content">
                            {active.length}
                        </div>
                    </Card>
                    {currentWitness && <Card mode="witnesses">
                        <Translate className="card__title" component="div" content={"blockchain.witnesses.currentWitness"}/>
                        <div className="card__content">
                            {currentWitness.name}
                        </div>
                    </Card>}
                    {currentWitness && <Card mode="witnesses">
                        <Translate className="card__title" component="div" content={"blockchain.witnesses.totalMissed"}/>
                        <div className="card__content">
                            {currentWitness.total_missed}
                        </div>
                    </Card>}
                    {blockchainData && <Card mode="witnesses">
                        <Translate className="card__title" component="div" content={"blockchain.witnesses.remainingBudget"} with={{currency: blockchainData.coreAsset.symbol}}/>
                        <div className="card__content">
                            {blockchainData.witness_budget}
                        </div>
                    </Card>}
                    {blockchainData && <Card mode="witnesses">
                        <Translate className="card__title" component="div" content={"blockchain.witnesses.nextVoteUpdate"}/>
                        <div className="card__content">
                            {new Date(blockchainData.next_maintenance_time).toLocaleString()}
                        </div>
                    </Card>}
                </div>

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
            </div>
        )
    }
}

export default Witnesses;