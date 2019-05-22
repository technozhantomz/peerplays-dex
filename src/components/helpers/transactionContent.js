import React, {Component, Fragment} from "react";
import dataFetch from "./dataFetch";
import formUserActivity from "../../actions/dataFetching/historyCallbacks/formUserActivity";

class TransactionContent extends Component {
    render() {
        return(
            <Fragment>
                <div className="block-header__items">
                    <div className="block-header__item">
                        <span>Date</span>
                        <span>25 Feb 2017</span>
                    </div>
                    <div className="block-header__item">
                        <span>Witness</span>
                        <span>f0x</span>
                    </div>
                    <div className="block-header__item">
                        <span>Previous</span>
                        <span>00638e275ea251a18ccc54195e259d35e78ddb73</span>
                    </div>
                </div>
                <Fragment>
                    <div className="operation__block">
                        <div className="header">
                            <div className="number">#1</div>
                            <div className="operation positive">transfer</div>
                        </div>
                        <div className="operation__row">
                            <div className="title">From</div>
                            <div className="content">
                                Bitshares.foundation
                            </div>
                        </div>
                        <div className="operation__row">
                            <div className="title">To</div>
                            <div className="content">
                                Other.account-name
                            </div>
                        </div>
                        <div className="operation__row">
                            <div className="title">Quantity</div>
                            <div className="content">
                                345,453.098321 TEST
                            </div>
                        </div>
                        <div className="operation__row">
                            <div className="title">Fee</div>
                            <div className="content">
                                0.34567 TEST
                            </div>
                        </div>
                    </div>
                </Fragment>
            </Fragment>
        )
    }
}

export default dataFetch({ method: formUserActivity, page: 'TransactionContent' })( TransactionContent );