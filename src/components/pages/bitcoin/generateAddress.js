import React, {useState, useEffect} from "react";
import Input from "../../helpers/form/input";
import {generateSidechainAddress} from "../../../actions/forms/generateSidechainAddress";
import {setSidechainAccounts} from '../../../dispatch/setAccount';
import {clearLayout} from "../../../dispatch/index";
import { getPassword } from "../../../actions/forms";
import { useFormInput } from "./formInput";
import Translate from "react-translate-component";
 

const GenerateAddress = (props) => {
    const {accountData, sidechain, hasDepoAddress, sidechainAccount} = props;
    const depositPublicKey = useFormInput('');
    const withdrawPublicKey = useFormInput('');
    const withdrawAddress = useFormInput('');
    const [sent, setSent] = useState(false);
    const [fee, setFee] = useState({amount: 0, symbol: accountData.assets[0].symbol});
    const [errors, setErrors] = useState('');    
    const [depositPublicKeyerrors, setErrorsdepositPublicKey] = useState('');    
    const [withdrawPublicKeyerrors, setErrorswithdrawPublicKey] = useState('');    
    const [withdrawAddresserrors, setErrorswithdrawAddress] = useState('');
    
    useEffect(() => {
        if(depositPublicKey.value){
            setErrorsdepositPublicKey();
        }
        if(withdrawPublicKey.value){
            setErrorswithdrawPublicKey();
        }
        if(withdrawAddress.value){
            setErrorswithdrawAddress();
        }
        
    },[depositPublicKey])
   
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
        if(!depositPublicKey.value &&  !withdrawPublicKey.value && !withdrawAddress.value){
            setErrorsdepositPublicKey("Field is required")
            setErrorswithdrawPublicKey("Field is required")
            setErrorswithdrawAddress("Field is required")
            return;
        }else if(!depositPublicKey.value){
            setErrorswithdrawPublicKey()
            setErrorswithdrawAddress()
            setErrorsdepositPublicKey("Field is required")
            return
        }else if(!withdrawPublicKey.value){
            setErrorswithdrawAddress()
            setErrorsdepositPublicKey()
            setErrorswithdrawPublicKey("Field is required")
            return
        }else if(!withdrawAddress.value){
            setErrorsdepositPublicKey()
            setErrorswithdrawPublicKey()
            setErrorswithdrawAddress("Field is required")
            return
        }else{
            setErrorsdepositPublicKey(""),
            setErrorswithdrawPublicKey(""),
            setErrorswithdrawAddress("")
        }
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
        <div className="card__content">
            <div className="form form__send">
                <div className="">
                    <Input name="depositPublicKey" className="modal__field" {...depositPublicKey}/>
                {depositPublicKeyerrors === "Field is required" && <h3 className="clr--negative">This Field is required</h3>}
                </div>
                <div className="">                
                    <Input name="withdrawPublicKey" className="modal__field" {...withdrawPublicKey}/>
                {withdrawPublicKeyerrors === "Field is required" && <h3 className="clr--negative">This Field is required</h3>}
                </div>
                <div className="">
                    <Input name="withdrawAddress" className="modal__field" {...withdrawAddress} />
                {withdrawAddresserrors === "Field is required" && <h3 className="clr--negative">This Field is required</h3>}
                </div>
                <div className="info__row">
                    <span style={{marginTop:'10px',marginBottom:'10px'}}> <Translate content={'field.labels.fee'}/>: {fee.amount} {fee.symbol}</span>
                    {sent && <span className="clr--positive">Sidechain address has been generated.</span>}
                    {errors === "ERROR" && <h3 className="clr--negative">Something went wrong!! Try again.</h3>}
                </div>            
                <div className="btn__row">
                    <Translate component="div"className="btn-round btn-round--buy" onClick={() => submitGenerateAddress()} content={'bitcoin.Generate'} />
                </div>
            </div>
        </div>
    )

};

export default GenerateAddress;