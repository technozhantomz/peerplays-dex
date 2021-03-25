import React, {Component, Fragment} from "react";
import Form from "../../form/form";
import Input from "../../form/input";
import Close from "../decoration/close";
import {generateSidechainAddress} from "../../../../actions/forms/generateSidechainAddress";
import Submit from "../decoration/submit";
import ModalTitle from "../decoration/modalTitle";
import { setSidechainAccounts } from '../../../../dispatch/setAccount';
import { removeModal } from '../../../../dispatch/setModal';

const handleAddressGenerated = ({sidechainAccounts}) => {
    if(sidechainAccounts) {
        setSidechainAccounts(sidechainAccounts);
    }

    removeModal();
}
class GenerateAddress extends Component {
  state = {
    defaultData: {
      sidechain: this.props.sidechain,
      depositPublicKey: '',
      password: this.props.password,
      withdrawPublicKey: '',
      withdrawAddress: '',
      fee: 0
    }
  };

  render() {
    const {defaultData} = this.state;
    const {sidechain} = this.props;

    return (
        <Fragment>
            <ModalTitle tag="generateAddress" additionalData={{sidechain}}/>
            <Form
                type={'sidechain_address_add'}
                requiredFields={['depositPublicKey', 'withdrawPublicKey', 'withdrawAddress']}
                defaultData={defaultData}
                action={generateSidechainAddress}
                handleResult={handleAddressGenerated}
            >
                {
                    form => <Fragment>
                        <div className="modal__content">
                            <Input
                                name="depositPublicKey"
                                comment={false}
                                onChange={form.handleChange}
                                error={form.state.errors}
                                value={form.state.data}
                            />
                            <Input
                                name="withdrawPublicKey"
                                className="modal__field"
                                onChange={form.handleChange}
                                error={form.state.errors}
                                value={form.state.data}
                            />
                            <Input
                                name="withdrawAddress"
                                className="modal__field"
                                onChange={form.handleChange}
                                error={form.state.errors}
                                value={form.state.data}
                            />
                        </div>
                        <div className="quantity-wrapper mt-2">
                            <div>
                                Fee: {form.state.data.fee.amount} {form.state.data.fee.symbol}
                            </div>
                        </div>
                        <div className="modal__bottom">
                            <Close />
                            <Submit tag="create" />
                        </div>
                    </Fragment>
                }
            </Form>
        </Fragment>
    );
  }
}

export default GenerateAddress;