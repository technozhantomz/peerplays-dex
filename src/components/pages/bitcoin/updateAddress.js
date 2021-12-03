import React, {Fragment, useState} from "react";
import Input from "../../helpers/form/input";
import {clearLayout} from "../../../dispatch/index";
import {updateSidechainAddress} from "../../../actions/forms/updateSidechainAddress";
import {setSidechainAccounts} from '../../../dispatch/setAccount';
import Form from "../../helpers/form/form";
import Translate from "react-translate-component";

const UpdateAddress = (props) => {
    const {loginData, accountData, sidechain, sidechainAccount} = props;
    const [copyed, setCopyed] = useState(false);
    const [updated, setUpdated] = useState(false);

    const DefaultData = {
        fee: 0,
        sidechainAddressId: sidechainAccount.id,
        sidechain,
        depositPublicKey: sidechainAccount.deposit_public_key,
        depositAddress: sidechainAccount.deposit_address,
        depositAddressData: sidechainAccount.deposit_address_data,
        withdrawPublicKey: sidechainAccount.withdraw_public_key,
        withdrawAddress: sidechainAccount.withdraw_address  
    }; 
      
    const copyToClip = (txt) => {
        navigator.clipboard.writeText(txt);
        setCopyed(true);
        setTimeout(() => {
            setCopyed(false);
        }, 5000);
    }

    const handleAddressUpdated = (data) => {
        Object.keys(data.map(({trx}) => {
            console.log(trx);  
            Object.keys(trx.operations.map((op) => {
                console.log(op[1]);
                setSidechainAccounts([op[1]]);
            }))
        }))
        setUpdated(true);
        setTimeout(() => {
            clearLayout();
            setUpdated(false); 
        }, 5000);
    };
    
    return(
        <div className="card__content">
            <Form
                type={'sidechain_address_delete'}
                className='form--btc form--btc__widget'
                defaultData={DefaultData}
                requiredFields={['withdrawPublicKey', 'withdrawAddress']}
                action={updateSidechainAddress}
                handleResult={handleAddressUpdated}
                needPassword>
            {
                form => {
                    const {errors, data} = form.state;
                    return (
                        <Fragment>                            
                            <Input 
                                name="withdrawPublicKey" 
                                className="modal__field"
                                onChange={form.handleChange}
                                error={errors}
                                value={data}/>
                            <Input 
                                name="withdrawAddress" 
                                className="modal__field" 
                                onChange={form.handleChange}
                                error={errors}
                                value={data}/>
                            <div className="info__row">
                                <span>Fee: {data.fee} {data.feeAsset}</span>
                                {errors === "ERROR" && <span className="clr--negative">Something went wrong!! Try again.</span>}
                                {updated && <span className="clr--positive">Sidechain address has been updated.</span>}
                            </div>
                            <div className="btn__row">
                                <button type="submit"  className="btn-round btn-round--buy">Update</button>
                            </div>
                        </Fragment>
                    )
                }
            }
            </Form>
        </div>
    )

};

export default UpdateAddress;