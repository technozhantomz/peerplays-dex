import React, {Component, Fragment} from 'react';
import Dropdown from "./dropdown";
import SelectHeader from "./selectHeader";
import Input from "./input";
import Form from "./form";

class QuickSellBuy extends Component {
    consoleLog = () => {
        console.log('form');
    };

    render() {
        return (
            <div className="card__content card__content--widget">
                <Form requiredFields={['bts', 'btc']} handleResult={this.consoleLog}>
                    {
                        form => <Fragment>
                            <div className="input__row">
                                <Input
                                    name="bts"
                                    className="with-bg number"
                                    value={{bts: '1,000'}}
                                    onChange={form.handleChange}
                                />
                                <Dropdown
                                    btn={<SelectHeader
                                        text="BTS"
                                        className="with-bg"
                                    />}
                                    list={[
                                        0, 1, 2, 3, 4, 5
                                    ].map((e, id) => <button key={id} onClick={this.changeLock}>{e}</button>)}
                                />
                            </div>
                            <div className="input__row">
                                <Input
                                    name="btc"
                                    className="with-bg number"
                                    value={{btc: '0,00001084'}}
                                    onChange={form.handleChange}
                                />
                                <Dropdown
                                    btn={<SelectHeader
                                        text="BTC"
                                        className="with-bg"
                                    />}
                                    list={[
                                        0, 1, 2, 3, 4, 5
                                    ].map((e, id) => <button key={id} onClick={this.changeLock}>{e}</button>)}
                                />
                            </div>
                            <div className="info__row">
                                <span>Fee</span>
                                <span>0.00567 BTS</span>
                                <span>Market Fee (0.1%)</span>
                                <span>1.00000 BTS</span>
                            </div>
                            <div className="btn__row">
                                <button className="btn-round btn-round--buy">Buy BTC</button>
                            </div>
                        </Fragment>
                    }
                </Form>
            </div>
        )
    }
}

export default QuickSellBuy;