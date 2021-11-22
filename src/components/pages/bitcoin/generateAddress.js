import React, {useState, useEffect} from "react";
import { Input } from "@material-ui/core";
import Form from "../../helpers/form/form";
// import Input from "../../helpers/form/input";
import Close from "../../helpers/modal/decoration/close";
import {generateSidechainAddress} from "../../../actions/forms/generateSidechainAddress";
import Submit from "../../helpers/modal/decoration/submit";
import ModalTitle from "../../helpers/modal/decoration/modalTitle";
import { setSidechainAccounts } from '../../../dispatch/setAccount';
import {clearLayout} from "../../../dispatch/index";
import { IconClipboardCopy } from "../../../svg";

// class GenerateAddress extends Component {
//   state = {
//     sended: false,
//     defaultData: {
//       sidechain: this.props.sidechain,
//       depositPublicKey: '',
//       password: this.props.password,
//       withdrawPublicKey: '',
//       withdrawAddress: '',
//       fee: 0
//     }
//   };

//   handleAddressGenerated = (data) => {
//     Object.keys(data.map(({trx}) => {
//         console.log(trx);  
//         Object.keys(trx.operations.map((op) => {
//             console.log(op[1]);
//             setSidechainAccounts([op[1]]);
//         }))
//     }))
    
//     this.setState({sended: true}, () => {
//     });

//     setTimeout(() => {
//         clearLayout();
//         window.location.reload();
//     }, 5000);
// };

//   render() {
//     const {defaultData, sended} = this.state;
//     const {sidechain} = this.props;

//     return (
//         <Fragment>
//             <ModalTitle tag="generateAddress" additionalData={{sidechain}}/>
//             <Form
//                 type={'sidechain_address_add'}
//                 requiredFields={['depositPublicKey', 'withdrawPublicKey', 'withdrawAddress']}
//                 defaultData={defaultData}
//                 action={generateSidechainAddress}
//                 handleResult={this.handleAddressGenerated}
//             >
//                 {
//                     form => {
//                         const {errors} = form.state;
//                         return (
//                     <Fragment>
//                         <div className="modal__content">
//                             <Input
//                                 name="depositPublicKey"
//                                 comment={false}
//                                 onChange={form.handleChange}
//                                 error={form.state.errors}
//                                 value={form.state.data}
//                             />
//                             <Input
//                                 name="withdrawPublicKey"
//                                 className="modal__field"
//                                 onChange={form.handleChange}
//                                 error={form.state.errors}
//                                 value={form.state.data}
//                             />
//                             <Input
//                                 name="withdrawAddress"
//                                 className="modal__field"
//                                 onChange={form.handleChange}
//                                 error={form.state.errors}
//                                 value={form.state.data}
//                             />
//                         </div>
//                         <div className="quantity-wrapper mt-2">
//                             <div>
//                                 Fee: {form.state.data.fee.amount} {form.state.data.fee.symbol}
//                             </div>
//                         </div>
//                         {sended && <span className="clr--positive">Sidechain address has been generated.</span>}
//                         {errors === "ERROR" && <h3 className="clr--negative">Something went wrong!! Try again.</h3>}
//                         <div className="modal__bottom">
//                             <Close />
//                             <Submit tag="create" />
//                         </div>
//                     </Fragment>
//                         )
//                     }
//                 }
//             </Form>
//         </Fragment>
//     );
//   }
// }

// export default GenerateAddress;

const GenerateAddress = (props) => {
    const {loginData, accountData, sidechain, sidechainAccount} = props;
    
    const [formData, setSidechainData] = useState({
        sidechain: sidechain,
        depositPublicKey: '',
        password: '',
        withdrawPublicKey: '',
        withdrawAddress: '',
        fee: 0
    });

   
   
    const copyToClip = (txt) => {
        navigator.clipboard.writeText(txt);
    }
    // if(sidechainAccount){
    //     return(
    //         <span>Deposit Address: {sidechainAccount.deposit_address}</span>
    //         <hr/>

    //     )
    // }

    return(
        <div>
            {sidechainAccount && <span>Deposit Address: {sidechainAccount.deposit_address}</span>}
            
            {sidechainAccount && <IconClipboardCopy onClick={copyToClip(sidechainAccount.deposit_address)}/>}
            {sidechainAccount && <hr/>}
            {!sidechainAccount && <Input
                name="withdrawPublicKey"
                className="modal__field"
                value={formData.depositPublicKey}
            />}
            <Input
                name="withdrawPublicKey"
                className="modal__field"
                value={formData.withdrawPublicKey}
            />
            <Input
                name="withdrawAddress"
                className="modal__field"
                value={formData.withdrawAddress}
            />
        </div>
    )

};

export default GenerateAddress;