import React, {Component, Fragment} from "react";
import Table from "../../helpers/table";
import {Card} from "../../helpers/card";
import {CardHeader} from "../../helpers/cardHeader";
import Translate from "react-translate-component";
import { updateAllBlockchainData } from '../../../actions/dataFetching/getGlobalData';

const tableHeadRecentBlocks = [
    {
        key: 'blockID',
        translateTag: 'blockID',
        params: 'fit-content'
    },
    {
        key: 'date',
        translateTag: 'date',
        params: 'fit-content bold'
    },
    {
        key: 'witness',
        translateTag: 'witness',
        params: 'fit-content'
    },
    {
        key: 'transaction',
        translateTag: 'transaction'
    }
];

class Explorer extends Component {
    state={
      data: {
        head_block_number: 0,
        current_supply: 0,
        active_witnesses: [],
        avgTime: 0,
        last_irreversible_block_num: 0,
        confidential_supply: 0,
        latestBlocks: [],
        coreAsset: {
            symbol: 'PPY'
        }
      }
    }

    componentDidMount() {
        this.refreshData();
        this.timerID = setInterval(() => this.refreshData(), 3000);
    }

    refreshData = () => {
        updateAllBlockchainData().then(data => {
          if(!data) {
            data = {
              head_block_number: 0,
              current_supply: 0,
              active_witnesses: [],
              avgTime: 0,
              last_irreversible_block_num: 0,
              confidential_supply: 0,
              latestBlocks: [],
              coreAsset: {
                  symbol: 'PPY'
              }
            }
          }
          this.setState({data});
        })
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const {head_block_number, current_supply, active_witnesses, avgTime, last_irreversible_block_num, confidential_supply, latestBlocks, coreAsset} = this.state.data;
        return (
            <Fragment>
                <div className="card__list">
                    <Card mode="explorer">
                        <Translate className="card__title" content={"blockchain.blockchain.current_block"} component="div"/>
                        <div className="card__content">
                            {head_block_number}
                        </div>
                    </Card>
                    <Card mode="explorer">
                        <Translate className="card__title" content={"blockchain.blockchain.supply"} with={{currency: coreAsset.symbol}} component="div"/>
                        <div className="card__content">
                            {current_supply}
                        </div>
                    </Card>
                    <Card mode="explorer">
                        <Translate className="card__title" content={"blockchain.blockchain.active_witnesses"} component="div"/>
                        <div className="card__content">
                            {active_witnesses.length}
                        </div>
                    </Card>
                    <Card mode="explorer">
                        <Translate className="card__title" content={"blockchain.blockchain.confirmation_time"} component="div"/>
                        <div className="card__content">
                            {avgTime.toFixed(2)}
                        </div>
                    </Card>
                    <Card mode="explorer">
                        <Translate className="card__title" content={"blockchain.blockchain.last_irreversible"} component="div"/>
                        <div className="card__content">
                            {last_irreversible_block_num}
                        </div>
                    </Card>
                    <Card mode="explorer">
                        <Translate className="card__title" content={"blockchain.blockchain.stealth_supply"} with={{currency: coreAsset.symbol}} component="div"/>
                        <div className="card__content">
                            {confidential_supply}
                        </div>
                    </Card>
                </div>

                <Card mode="table">
                    <CardHeader title={'block.recentBlocks.title'}/>
                    <Table
                        tableHead={tableHeadRecentBlocks}
                        rows={latestBlocks}
                    />
                </Card>
            </Fragment>
        )
    }
}

export default Explorer;