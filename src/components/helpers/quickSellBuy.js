import React, {Component, Fragment} from 'react';
import Dropdown from "./form/dropdown";
import SelectHeader from "./selectHeader";
import Input from "./form/input";
import {store} from '../../index.js';
import Form from "./form/form";
import {sellBuy} from "../../actions/forms";
import {defaultQuote, defaultToken} from "../../params/networkParams";
import {getAccountData} from "../../actions/store";
import {dbApi} from "../../actions/nodes";
import FieldWithHint from "./form/fieldWithHint";

const getAssetsList = async () => dbApi('list_assets', ['', 100])
    .then(result => result.map(e => e.symbol));

const getUserAssetsList = async (symbol) => (
    getAccountData().assets
        .filter(item.name.includes(symbol))
        .map(item => item.name)
);

class QuickSellBuy extends Component {
    state = {
        defaultData: false,
        userTokens: false,
        sended: false
    };

    componentDidMount() {
        const userTokens = getAccountData().assets.map(e => e.symbol);

        const defaultData = {
            sellAsset: userTokens.length ? userTokens[0] : defaultToken,
            buyAsset: defaultQuote,
            fee: 0,
            amount_to_sell: 0,
            amount_to_receive: 0
        };

        this.setState({userTokens, defaultData});
    }


    handleTransfer = (data) => {
        const context = this;
        this.setState({sended: true}, () => setTimeout(() => context.setState({sended: false}), 5000));

        if(this.props.update) {
          this.props.update();
        }
    };

    render() {
        const {defaultData, userTokens, sended} = this.state;

        if (!defaultData) return <span/>;

        return (
            <div className="card__content card__content--widget">
                <Form
                    type={'limit_order_create'}
                    className="form__sell-buy"
                    defaultData={defaultData}
                    requiredFields={['amount_to_sell', 'amount_to_receive', 'asset_to_sell', 'asset_to_sell']}
                    action={sellBuy}
                    handleResult={this.handleTransfer}
                    needPassword
                >
                    {
                        form => {
                            const {errors, data} = form.state;

                            return (
                                <Fragment>
                                    <div className="input__row">
                                        <Input
                                            name="amount_to_sell"
                                            type="number"
                                            hideLabel={true}
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                        <FieldWithHint
                                            name="asset_to_sell"
                                            method={getUserAssetsList}
                                            hideLabel={true}
                                            handleChange={form.handleChange}
                                            errors={errors}
                                            defaultHints={userTokens}
                                            readOnly={true}
                                        />
                                    </div>
                                    <div className="input__row">
                                        <Input
                                            name="amount_to_receive"
                                            type="number"
                                            hideLabel={true}
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                        <FieldWithHint
                                            name="buyAsset"
                                            method={getAssetsList}
                                            hideLabel={true}
                                            handleChange={form.handleChange}
                                            defaultVal={data}
                                            errors={errors}
                                            readOnly={true}
                                        />
                                    </div>
                                    <div className="info__row">
                                        <span>Fee: {data.fee} {data.sellAsset}</span>
                                        {sended && <span className="clr--positive">Transaction Completed</span>}
                                    </div>
                                    <div className="btn__row">
                                        <button className="btn-round btn-round--buy" onClick={form.submit}>
                                            Buy
                                        </button>
                                    </div>
                                </Fragment>
                            )
                        }
                    }
                </Form>
            </div>
        )
    }
}

export default QuickSellBuy;