import React, {useState, useEffect} from "react";
import Input from "../../helpers/form/input";
import {generateSidechainAddress} from "../../../actions/forms/generateSidechainAddress";
import {setSidechainAccounts} from '../../../dispatch/setAccount';
import {clearLayout} from "../../../dispatch/index";
import { getPassword } from "../../../actions/forms";
import { useFormInput } from "./formInput";



const GenerateAddress = (props) => {
    const {loginData, accountData, sidechain} = props;
    const depositPublicKey = useFormInput('');
    const withdrawPublicKey = useFormInput('');
    const withdrawAddress = useFormInput('');
    const [sent, setSent] = useState(false);
    const [fee, setFee] = useState({amount: 0, symbol: accountData.assets[0].symbol});
    const [errors, setErrors] = useState('');    
   
    const handleAddressGenerated = (data) => {
        Object.keys(data.map(({trx}) => {
            console.log(trx);  
            Object.keys(trx.operations.map((op) => {
                console.log(op[1]);
                setSidechainAccounts([op[1]]);
            }))
        }))
        setSent(true);
        setTimeout(() => {
            clearLayout();
            setSent(false);
            window.location.reload();
        }, 5000);
    };

    const submitGenerateAddress = () => {
        getPassword(password => generateSidechainAddress({
            sidechain: sidechain,
            depositPublicKey: depositPublicKey.value,
            password: password,
            withdrawPublicKey: withdrawPublicKey.value,
            withdrawAddress: withdrawAddress.value,
            fee: fee
        }).then((result) => {
            result.success ? handleAddressGenerated(result.callbackData) : setErrors(result.errors);
        }));
    };

    return(
        <div className="card__content">
            <div className="form form__send">
                <div className="input__row">
                    <Input name="depositPublicKey" className="modal__field" {...depositPublicKey}/>
                </div>
                <div className="input__row">                
                    <Input name="withdrawPublicKey" className="modal__field" {...withdrawPublicKey}/>
                </div>
                <div className="input__row">
                    <Input name="withdrawAddress" className="modal__field" {...withdrawAddress} />
                </div>
                <div className="info__row">
                    <span>Fee: {fee.amount} {fee.symbol}</span>
                    {sent && <span className="clr--positive">Sidechain address has been generated.</span>}
                    {errors === "ERROR" && <h3 className="clr--negative">Something went wrong!! Try again.</h3>}
                </div>            
                <div className="btn__row">
                    <button className="btn-round btn-round--buy" onClick={() => submitGenerateAddress()}>Generate</button>
                </div>
            </div>
        </div>
    )

};

export default GenerateAddress;