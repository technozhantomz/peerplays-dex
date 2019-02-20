import React, {Component, Fragment} from 'react';
import Dropdown from "./dropdown";
import SelectHeader from "./selectHeader";
import Input from "./input";
import {store} from '../../index.js';
import Form from "./form";
import {sellBuy} from "../../actions/forms";

class QuickSellBuy extends Component {
    state = {
        defaultData: false,
        userTokens: false,
        sended: false
    };

    componentDidMount() {
        const userTokens =  store.getState().account.assets;

        const defaultData = {
            sellAsset: userTokens[0].symbol,
            buyAsset: 'MYTEST',
            fee: 0
        };

        this.setState({userTokens, defaultData});
    }


    handleTransfer = (data) => {
        console.log(data);
        const context = this;
        this.setState({sended: true}, () => setTimeout(() => context.setState({sended: false}), 5000));
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
                    requiredFields={['amount_to_sell', 'amount_to_receive']}
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
                                            labelTag="quickSellBuy.sell"
                                            className="with-bg"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                        <Dropdown
                                            btn={<SelectHeader
                                                text={data.sellAsset}
                                                className="with-bg"
                                                error={errors['sellAsset']}
                                            />}
                                            list={userTokens.map(e => <button
                                                onClick={() => form.handleChange(e.symbol, 'sellAsset')}
                                                type="button">{e.symbol}</button>)}
                                        />
                                    </div>
                                    <div className="input__row">
                                        <Input
                                            name="amount_to_receive"
                                            labelTag="quickSellBuy.buy"
                                            className="with-bg"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                        <Dropdown
                                            btn={<SelectHeader
                                                text={data.buyAsset}
                                                className="with-bg"
                                                error={errors['buyAsset']}
                                            />}
                                            list={userTokens.map(e => <button
                                                onClick={() => form.handleChange(e.symbol, 'buyAsset')}
                                                type="button">{e.symbol}</button>)}
                                        />
                                    </div>
                                    <div className="info__row">
                                        <span>Fee: {data.fee} {data.sellAsset}</span>
                                        {sended && <span className="clr--positive">Trx completed</span>}
                                        {/*<span>0.00567 BTS</span>*/}
                                        {/*<span>Market Fee (0.1%)</span>*/}
                                        {/*<span>1.00000 BTS</span>*/}
                                    </div>
                                    <div className="btn__row">
                                        <button className="btn-round btn-round--buy" onClick={form.submit}>
                                            Buy BTC
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