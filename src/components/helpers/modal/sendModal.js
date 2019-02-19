import React, {Component, Fragment} from 'react';
import Form from "../form";
import Input from "../input";
import Dropdown from "../dropdown";
import SelectHeader from "../selectHeader";
import {store} from '../../../index.js';
import {removeModal} from "../../../dispatch/setModal";
import {transfer} from "../../../actions/forms/index";
import Textarea from "../textarea";
import {ChainTypes} from "bitsharesjs";
import {dbApi} from "../../../actions/nodes/index";
import {getSpecificFee} from "../../../actions/dataFetching/index";
import {calculateSendFee} from "../../../actions/forms";

class SendModal extends Component {

    state = {
        defaultData: false,
        fees: false,
        userTokens: false
    };

    componentDidMount(){
        let defaultData = {...this.state.defaultData};
        const userTokens = store.getState().account.assets;
        const startAsset =  this.props.defaultToken || userTokens[0].symbol;

        defaultData.from = this.props.defaultFrom || '';
        defaultData.password = this.props.password;
        defaultData.quantityAsset = startAsset;
        defaultData.fee = 0;
        defaultData.feeAsset = startAsset;

        getSpecificFee('transfer', false).then(fees => this.setState({fees, userTokens, defaultData}));
    }

    handleTransfer = () => removeModal();

    render(){

        const {fees, defaultData, userTokens} = this.state;

        if(!userTokens) return <span />;

        return (
            <Fragment>
                <div className="modal__header">
                    <h2 className="modal__title">Send from</h2>
                </div>
                <Form
                    fees={fees}
                    feesAction={calculateSendFee}
                    defaultData={defaultData}
                    action={transfer}
                    requiredFields={['to', 'quantity']}
                    handleResult={this.handleTransfer}
                >
                    {
                        form => {

                            const {errors, data} = form.state;

                            return(
                                <Fragment>
                                    <div className="modal__content">
                                        <Input
                                            name="from"
                                            labelTag="send.from"
                                            className="with-bg"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                            disabled
                                        />
                                        <Input
                                            name="to"
                                            labelTag="send.to"
                                            type="text"
                                            className="with-bg"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                        <div className="quantity-wrapper">
                                            <Input
                                                name="quantity"
                                                labelTag="send.quantity"
                                                type="number"
                                                className="with-bg"
                                                onChange={form.handleChange}
                                                error={errors}
                                                value={data}
                                            />
                                            <Dropdown
                                                btn={<SelectHeader
                                                    text={data.quantityAsset}
                                                    className="with-bg"
                                                />}
                                                list={userTokens.map(e => <button onClick={() => form.handleChange(e.symbol, 'quantityAsset')} type="button">{e.symbol}</button>)}
                                            />
                                        </div>
                                        <Textarea
                                            name="memo"
                                            labelTag="send.memo"
                                            comment="send.memoComment"
                                            className="with-bg"
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                        <div className="quantity-wrapper">
                                            <div>
                                                Fee: {data.fee} {data.quantityAsset}
                                            </div>
                                            {/*<Dropdown*/}
                                            {/*btn={<SelectHeader*/}
                                            {/*text={form.state.data.feeAsset}*/}
                                            {/*className="with-bg"*/}
                                            {/*/>}*/}
                                            {/*list={userTokens.map(e => <button onClick={() => form.handleChange(e.symbol, 'feeAsset')} type="button">{e.symbol}</button>)}*/}
                                            {/*/>*/}
                                        </div>
                                    </div>
                                    <div className="modal__bottom">
                                        <button onClick={removeModal} className="modal__button" type="button">Cancel</button>
                                        <button className="modal__button" type="submit">Send</button>
                                    </div>
                                </Fragment>
                            )
                        }
                    }
                </Form>
            </Fragment>
        )
    }
};

export default SendModal;