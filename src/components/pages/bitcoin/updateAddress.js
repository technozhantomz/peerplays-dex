import React, {useState} from "react";
import Input from "../../helpers/form/input";
import {IconClipboardCheck, IconClipboardCopy} from "../../../svg";
import {getPassword} from "../../../actions/forms";
import {useFormInput} from './formInput';
import {clearLayout} from "../../../dispatch/index";
import {updateSidechainAddress} from "../../../actions/forms/updateSidechainAddress";

const UpdateAddress = (props) => {
    const {loginData, accountData, sidechain, sidechainAccount} = props;
    const withdrawPublicKey = useFormInput(sidechainAccount.withdraw_public_key);
    const withdrawAddress = useFormInput(sidechainAccount.withdraw_address);
    const depositAddress = useFormInput(sidechainAccount.deposit_address);
    const [copyed, setCopyed] = useState(false);
    const [fee, setFee] = useState({amount: 0, symbol: accountData.assets[0].symbol});
    const [required, setRequired] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [errors, setErrors] = useState('');    
      
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
            // window.location.reload();
        }, 5000);
    };

    const SubmitUpdateAddress = () => {
        getPassword(password => updateSidechainAddress({
            password,
            fee: fee,
            sidechainAddressId: sidechainAccount.id,
            sidechain,
            depositPublicKey: sidechainAccount.deposit_public_key,
            depositAddress: sidechainAccount.deposit_address,
            depositAddressData: sidechainAccount.deposit_address_data,
            withdrawPublicKey: withdrawPublicKey.value,
            withdrawAddress: withdrawAddress.value
        }).then((result) => {
            result.success ? handleAddressUpdated(result) : setErrors(result.errors);
        }));
    };
    
    return(
        <div className="card__content">
            <div className="form form form__send">
                <div className="input__row-inline">
                    <span>Deposit Address:</span>
                    <input className="input" defaultValue={sidechainAccount.deposit_address}/>
                    <button onClick={() => copyToClip(sidechainAccount.deposit_address)}>{copyed ? <IconClipboardCheck/> : <IconClipboardCopy />}</button>
                </div>
                <hr/>  
            </div>
            <div className="form form form__send">
                <div className="input__row">
                    <Input name="withdrawPublicKey" className="modal__field" {...withdrawPublicKey}/>
                </div>
                <div className="input__row">
                    <Input name="withdrawAddress" className="modal__field" {...withdrawAddress}/>
                </div>
                <div className="info__row">
                    <span>Fee: {fee.amount} {fee.symbol}</span>
                    {/* {required && <span>All fields are required</span>} */}
                    {errors === "ERROR" && <span className="clr--negative">Something went wrong!! Try again.</span>}
                    {updated && <span className="clr--positive">Sidechain address has been updated.</span>}
                </div>
                <div className="btn__row">
                    <button className="btn-round btn-round--buy" onClick={() => SubmitUpdateAddress()}>Update</button>
                </div>
            </div>
        </div>
    )

};

export default UpdateAddress;