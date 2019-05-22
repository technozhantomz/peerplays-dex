import React, {Component, Fragment} from 'react';
import Dropdown from "./form/dropdown";
import SelectHeader from "./selectHeader";
import Input from "./form/input";
import Form from "./form/form";
import {transfer} from "../../actions/forms";
import Textarea from "./form/textarea";
import {defaultToken} from "../../params/networkParams";
import {getAccountData} from "../../actions/store";

class SendForm extends Component {
    state = {
        sended: false,
        defaultData: false,
        userTokens: false
    };

    componentDidMount() {

        const user = getAccountData();
        const userTokens = user.assets;
        const startAsset = userTokens.length ? userTokens[0].symbol : defaultToken;

        const defaultData = {
            from: user.name,
            quantityAsset: startAsset,
            fee: 0,
            feeAsset: startAsset
        };

        this.setState({userTokens, defaultData});
    }

    handleTransfer = (data) => {
        const context = this;
        this.setState({sended: true}, () => setTimeout(() => context.setState({sended: false}), 5000));
    };

    render() {
        const {sended, defaultData, userTokens} = this.state;

        if (!defaultData) return <span/>;

        return (
            <div className="card__content">
                <Form
                    type={'transfer'}
                    className="form__send"
                    defaultData={defaultData}
                    requiredFields={['to', 'quantity']}
                    action={transfer}
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
                                            name="from"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                            disabled
                                        />
                                        <Input
                                            name="quantity"
                                            type="number"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                    </div>
                                    <div className="input__row">
                                        <Input
                                            name="to"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                        <Dropdown
                                            btn={<SelectHeader
                                                text={data.quantityAsset}
                                            />}
                                            list={userTokens.map(e => <button
                                                onClick={() => form.handleChange(e.symbol, 'quantityAsset')}
                                                type="button">{e.symbol}</button>)}
                                        />
                                    </div>
                                    <div className="input__row">
                                        <Textarea
                                            name="memo"
                                            comment={true}
                                            className="memo"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                    </div>
                                    <div className="btn__row">
                                        <span>Fee: {data.fee} {data.quantityAsset}</span>
                                        {sended && <span className="clr--positive">Trx completed</span>}
                                        <button type="submit" className="btn-round btn-round--send">SEND</button>
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

export default SendForm;