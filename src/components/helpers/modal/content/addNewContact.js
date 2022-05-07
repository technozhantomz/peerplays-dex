import React, {Component, Fragment} from 'react';
import ModalTitle from "../decoration/modalTitle";
import Form from "../../form/form";
import {getAccountData, getBasicAsset, getFees} from "../../../../actions/store";
import FieldWithHint from "../../form/fieldWithHint";
import {dbApi} from "../../../../actions/nodes";
import ModalButton from "../../buttons/modalButton";
import Submit from "../decoration/submit";
import Close from "../decoration/close";
import {editStorage, getStorage} from "../../../../actions/storage";
import {clearLayout} from "../../../../dispatch";
import {updateAccount} from "../../../../dispatch/setAccount";

const getSymbolsList = async (symbol) => dbApi('lookup_accounts', [symbol, 5])
    .then(result => {
        const accountData = getAccountData();

        result = result.filter(e => e[0].includes(symbol) && e[0] !== accountData.name);

        result = result.map(e => e[0]);

        const contactsList = getStorage('contacts');
        const oldData = contactsList[accountData.name] ? contactsList[accountData.name].map(e => e.name) : [];

        return result.filter(e => !oldData.includes(e));
    });

const getAccountId = async (account) => dbApi('get_account_by_name', [account])
    .then(result => result);

class AddNewContact extends Component {
    handleAddNewContact = (data) => {
        getAccountId(data.name).then(e => {
            const contactsList = getStorage('contacts');
            const accountData = getAccountData();
            const oldData = contactsList[accountData.name] ? contactsList[accountData.name] : [];

            data = {
                ...data,
                id: e.id,
                type: 3
            };

            oldData.push(data);

            editStorage('contacts', {[accountData.name]: oldData});
            accountData.contacts = oldData;
            updateAccount(accountData);
            clearLayout();
        });
    };

    render() {
        return (
            <Fragment>
                <ModalTitle tag={"newContact"}/>
                <Form
                    type={'asset_update_issuer'}
                    requiredFields={['name']}
                    handleResult={this.handleAddNewContact}
                >
                    {
                        form => {
                            const {errors, data} = form.state;
                            return (
                                <Fragment>
                                    <FieldWithHint
                                        name="name"
                                        method={getSymbolsList}
                                        handleChange={form.handleChange}
                                        defaultVal={data}
                                        errors={errors}
                                    />
                                    <div className="modal__bottom">
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
}

export default AddNewContact;