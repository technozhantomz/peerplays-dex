import React, {Component, Fragment} from 'react';
import Dropdown from "./dropdown";
import SelectHeader from "./selectHeader";
import Input from "./input";
import Form from "./form";
import {calculateSendFee, transfer} from "../../actions/forms";
import {getSpecificFee} from "../../actions/dataFetching";
import {store} from '../../index.js';
import Textarea from "./textarea";

class SendForm extends Component {
    state = {
        sended: false,
        defaultData: false,
        fees: false,
        userTokens: false
    };

    componentDidMount() {
        let defaultData = {...this.state.defaultData};
        const user = store.getState().account;
        const userTokens = user.assets;
        const startAsset = userTokens[0].symbol;

        defaultData.from = user.name;
        // defaultData.to = 'ann-test';
        // defaultData.quantity = 1;
        defaultData.quantityAsset = startAsset;
        defaultData.fee = 0;

        getSpecificFee('transfer', false).then(fees => this.setState({fees, userTokens, defaultData}));
    }

    handleTransfer = (data) => {
        const context = this;
        this.setState({sended: true}, () => setTimeout(() => context.setState({sended: false}), 5000));
    };

    render() {
        const {sended, fees, defaultData, userTokens} = this.state;

        if (!defaultData) return <span/>;

        return (
            <div className="card__content">
                <Form
                    fees={fees}
                    feesAction={calculateSendFee}
                    defaultData={defaultData}
                    action={transfer}
                    requiredFields={['to', 'quantity']}
                    handleResult={this.handleTransfer}
                    className="form__send"
                    needPassword
                >
                    {
                        form => {
                            const {errors, data} = form.state;

                            console.log(form.state);

                            return (
                                <Fragment>
                                    <div className="input__row">
                                        <Input
                                            name="from"
                                            labelTag="send.from"
                                            className="with-bg"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                            disabled
                                        />
                                        {/*<Dropdown*/}
                                        {/*btn={<SelectHeader*/}
                                        {/*labelTag="dashboard.sendForm.from"*/}
                                        {/*text="super.duper"*/}
                                        {/*className="with-bg with-border"*/}
                                        {/*/>}*/}
                                        {/*list={[*/}
                                        {/*0, 1, 2, 3, 4, 5*/}
                                        {/*].map((e, id) => <button key={id} onClick={this.changeLock}>{e}</button>)}*/}
                                        {/*/>*/}
                                        <Input
                                            name="quantity"
                                            labelTag="send.quantity"
                                            type="number"
                                            className="with-bg"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                        {/*<Input*/}
                                        {/*name="quantity"*/}
                                        {/*className="with-bg with-border field__input"*/}
                                        {/*labelTag="dashboard.sendForm.quantity"*/}
                                        {/*value={{quantity: '1,000'}}*/}
                                        {/*onChange={form.handleChange}*/}
                                        {/*/>*/}
                                    </div>
                                    <div className="input__row">
                                        <Input
                                            name="to"
                                            labelTag="send.to"
                                            type="text"
                                            className="with-bg"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                        {/*<Dropdown*/}
                                        {/*btn={<SelectHeader*/}
                                        {/*text="To"*/}
                                        {/*className="with-bg"*/}
                                        {/*/>}*/}
                                        {/*list={[*/}
                                        {/*0, 1, 2, 3, 4, 5*/}
                                        {/*].map((e, id) => <button key={id} onClick={this.changeLock}>{e}</button>)}*/}
                                        {/*/>*/}
                                        <Dropdown
                                            btn={<SelectHeader
                                                text={data.quantityAsset}
                                                className="with-bg"
                                            />}
                                            list={userTokens.map(e => <button
                                                onClick={() => form.handleChange(e.symbol, 'quantityAsset')}
                                                type="button">{e.symbol}</button>)}
                                        />
                                        {/*<Dropdown*/}
                                        {/*btn={<SelectHeader*/}
                                        {/*labelTag="dashboard.sendForm.currency"*/}
                                        {/*text="BTS"*/}
                                        {/*className="with-bg with-border currency"*/}
                                        {/*/>}*/}
                                        {/*list={[*/}
                                        {/*0, 1, 2, 3, 4, 5*/}
                                        {/*].map((e, id) => <button key={id} onClick={this.changeLock}>{e}</button>)}*/}
                                        {/*/>*/}
                                    </div>
                                    <div className="input__row">
                                        <Textarea
                                            name="memo"
                                            labelTag="send.memo"
                                            className="with-bg memo"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                        {/*<Input*/}
                                        {/*name="memo"*/}
                                        {/*className="with-bg memo"*/}
                                        {/*value={{memo: 'Memo'}}*/}
                                        {/*onChange={form.handleChange}*/}
                                        {/*/>*/}
                                    </div>
                                    <div className="btn__row">
                                        <span>Fee: {data.fee} {data.quantityAsset}</span>
                                        {sended && <span className="clr--positive">Trx completed</span>}
                                        <button type="submit" className="btn-round btn-round--send">SEND</button>
                                    </div>
                                    {/*<div className="btn__row">*/}
                                    {/*<button className="btn-round btn-round--send">SEND</button>*/}
                                    {/*</div>*/}
                                </Fragment>
                            )
                        }
                    }
                </Form>
            </div>
        )
    }
}

export default SendForm;