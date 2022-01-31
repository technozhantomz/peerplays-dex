import React, {useState, useEffect} from "react";
import Input from "../../helpers/form/input";
import {generateSidechainAddress} from "../../../actions/forms/generateSidechainAddress";
import {setSidechainAccounts} from '../../../dispatch/setAccount';
import {clearLayout} from "../../../dispatch/index";
import { getPassword } from "../../../actions/forms";
import { useFormInput } from "./formInput";

const GenerateAddress = (props) => {
    const {accountData, sidechain, hasDepoAddress, sidechainAccount} = props;
    const depositPublicKey = useFormInput('');
    const withdrawPublicKey = useFormInput('');
    const withdrawAddress = useFormInput('');
    const [sent, setSent] = useState(false);
    const [fee, setFee] = useState({amount: 0, symbol: accountData.assets[0].symbol});
    const [errors, setErrors] = useState(''); 
    
    useEffect(() => {
        if(!hasDepoAddress && sidechainAccount){
           setErrors('son_network_error');
        }
    });
   
    const handleAddressGenerated = (data) => {
        data.filter(act => {(act.sidechain == sidechain) ? setSidechainAccounts(act) : ""});
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
            result.success ? handleAddressGenerated(result.sidechainAccounts) : setErrors(result.errors);
        }));
    };

    return(
        <div className="form form--btc">
                <Input name="depositPublicKey" className="modal__field" {...depositPublicKey}/>
                <Input name="withdrawPublicKey" className="modal__field" {...withdrawPublicKey}/>
                <Input name="withdrawAddress" className="modal__field" {...withdrawAddress} />
            <div className="info__row">
                <span>Fee: {fee.amount} {fee.symbol}</span>
                {sent && <span className="clr--positive">Sidechain address has been generated.</span>}
                {errors === "ERROR" && <h3 className="clr--negative">Server side error!! Try again.</h3>}
                {errors === "son_network_error" && <h3 className="clr--negative">Bitcoin SON network unavailable please try again.</h3>}
                {errors === "DUPLICATE" && <h3 className="clr--negative">Key already exists.</h3>}
            </div>            
            <div className="btn__row">
                <button className="btn-round btn-round--buy" onClick={() => submitGenerateAddress()}>Generate</button>
            </div>
        </div>
    )

};

export default GenerateAddress;