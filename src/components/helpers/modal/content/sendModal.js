import React, {Component, Fragment} from 'react';
import Form from "../../form/form";
import Input from "../../form/input";
import Dropdown from "../../form/dropdown";
import SelectHeader from "../../selectHeader";
import {transfer} from "../../../../actions/forms/index";
import Textarea from "../../form/textarea";
import Close from "../decoration/close";
import {clearLayout} from "../../../../dispatch/index";
import {getAccountData} from "../../../../actions/store/index";
import ModalTitle from "../decoration/modalTitle";
import Submit from "../decoration/submit";
import {getBasicAsset} from "../../../../actions/store";
import FieldWithHint from "../../form/fieldWithHint";

const getSymbolsList = async (symbol) => (
    getAccountData().contacts
        .filter(item => item.type !== 2 && item.name.includes(symbol))
        .map(item => item.name)
);

class SendModal extends Component {

    state = {
        sended: false,
        defaultData: false,
        userTokens: false
    };

    componentDidMount() {
        const {defaultFrom, defaultTo, defaultToken, password} = this.props;
        const contacts = getAccountData().contacts.filter(item => item.type !== 2).map(item => item.name);
        const userTokens = getAccountData().assets;

        const startAsset =  defaultToken || userTokens[0].symbol;
        const basicAsset = getBasicAsset().symbol;

        const defaultData = {
            from: defaultFrom || '',
            to: defaultTo || '',
            password: password,
            quantityAsset: startAsset,
            fee: 0,
            feeAsset: basicAsset,
            contacts: contacts || []
        };

        this.setState({userTokens, defaultData});
    }

    handleSend = (data) => {
        this.setState({sended: true}, () => {
        });

        setTimeout(() => {
            clearLayout();
            window.location.reload();
        }, 3000);
    };

    render() {

        const {defaultData, userTokens, sended} = this.state;

        if (!userTokens) return <span/>;

        return (
            <Fragment>
                <ModalTitle tag="send"/>
                <Form
                    type={'transfer'}
                    defaultData={defaultData}
                    requiredFields={['to', 'quantity']}
                    action={transfer}
                    handleResult={this.handleSend}
                >
                    {
                        form => {

                            const {errors, data} = form.state;

                            return (
                                <Fragment>
                                    <div className="modal__content">
                                        <Input
                                            id="modalSendFrom"
                                            name="from"
                                            error={errors}
                                            value={data}
                                            disabled
                                        />
                                        {
                                            this.props.defaultTo
                                                ?
                                                <Input
                                                    id="modalSendTo"
                                                    name="to"
                                                    className="mt-2"
                                                    type="text"
                                                    onChange={form.handleChange}
                                                    error={errors}
                                                    value={data}
                                                    disabled={true}
                                                />
                                                :
                                                <FieldWithHint
                                                    name="to"
                                                    className="mt-2"
                                                    method={getSymbolsList}
                                                    handleChange={form.handleChange}
                                                    errors={errors}
                                                    defaultHints={data.contacts}
                                                />
                                        }
                                        <div className="quantity-wrapper mt-2">
                                            <Input
                                                id="modalSendQuantity"
                                                name="quantity"
                                                type="number"
                                                onChange={form.handleChange}
                                                error={errors}
                                                value={data}
                                            />
                                            <Dropdown
                                                btn={<SelectHeader
                                                    text={data.quantityAsset}
                                                    className="with-bg"
                                                />}
                                                list={userTokens.map(e => <button
                                                    onClick={() => form.handleChange(e.symbol, 'quantityAsset')}
                                                    type="button">{e.symbol}</button>)}
                                            />
                                        </div>
                                        <Textarea
                                            id="modalSendMemo"
                                            name="memo"
                                            comment={true}
                                            onChange={form.handleChange}
                                            error={errors}
                                            value={data}
                                        />
                                        <div className="quantity-wrapper mt-2">
                                            <div>
                                                Fee: {data.fee} {data.feeAsset}
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
                                        {sended && <h3 className="clr--positive">Transaction Completed</h3>}
                                        <Close/>
                                        <Submit tag="send"/>
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