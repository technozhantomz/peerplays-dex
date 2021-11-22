import React, {useState, useEffect} from "react";
//import { Input } from "@material-ui/core";
import Form from "../../helpers/form/form";
import Input from "../../helpers/form/input";
import { IconClipboardCopy } from "../../../svg";

const UpdateAddress = (props) => {
    const {loginData, accountData, sidechain, sidechainAccount} = props;
    const [formData, setSidechainData] = useState({
        sidechain: sidechain,
        depositPublicKey: sidechainAccount.deposit_public_key,
        password: '',
        withdrawPublicKey: sidechainAccount.withdraw_public_key,
        withdrawAddress: sidechainAccount.withdraw_address,
        fee: 0
    });
   
    const copyToClip = (txt) => {
        navigator.clipboard.writeText(txt);
    }

    const SubmitUpdateAddress = () => {

    }
    
    return(
        <div>
            <div>
                <span>Deposit Address: {sidechainAccount.deposit_address}</span>
                <IconClipboardCopy onClick={copyToClip(sidechainAccount.deposit_address)}/>
            </div>
            <hr/>
            <div>
                <Input
                    name="withdrawPublicKey"
                    className="modal__field"
                    defaultValue={formData.withdrawPublicKey}
                    value={formData.withdrawPublicKey}
                />
                <Input
                    name="withdrawAddress"
                    className="modal__field"
                    defaultValue={formData.withdrawAddress}
                    value={formData.withdrawAddress}
                />
                <button className="btn-round btn-round--buy" onClick={() => (formData.withdrawAddress !== sidechainAccount.withdraw_address || formData.withdrawPublicKey !== sidechainAccount.withdraw_public_key ) ? "" : SubmitUpdateAddress()}>Update</button>
            </div>
        </div>
    )

};

export default UpdateAddress;