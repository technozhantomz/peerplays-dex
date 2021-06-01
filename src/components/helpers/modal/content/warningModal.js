import React, {Component, Fragment} from "react";
import Close from "../decoration/close";
import ModalTitle from "../decoration/modalTitle";
import ModalButton from "../../buttons/modalButton";
import Translate from "react-translate-component";
import {clearLayout} from "../../../../dispatch/layoutDispatch";
import {defaultTrx} from "../../../../actions/forms";
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class WarningModal extends Component{

    state = {
        errors: this.props.error,
        loading: false,
        upgraded:false,
        hideModal: false
    };

    handleMethod = () => {
        const {trx, password} = this.props;
        this.setState({loading:true,hideModal:true});
        defaultTrx({trx, password})
            .then(result => {
                if(result.success){
                    this.setState({loading:false,upgraded:true});
                        setTimeout(() => {
                        clearLayout();
                    }, 5000);
                }})
            .catch(err => {
                if(err.message.includes('Insufficient Balance')) this.setState({errors: 'isNotEnough', loading:false,hideModal:false})
            });
    };

    render(){

        const fee = this.props.fee;
        const errors = this.state.errors;
        const {loading,upgraded,hideModal} = this.state;
        return(
            <Fragment>
                {!hideModal && 
                <div>
                <ModalTitle tag="warning" />
                <Translate
                    component="div"
                    content={!errors ? `modal.warning.message` : `errors.${errors}`}
                    className={!errors ? '' : 'modal__error'}
                    with={{fee}}
                />
                <div className="modal__bottom">
                    <Close />
                    {!errors && <ModalButton tag="continue" onClick={this.handleMethod} /> }
                </div>
                </div>
                }
                
                {loading && 
                <div className="sweet-loading">
                    <MoonLoader css={override} size={50} color={"#123abc"} loading={this.state.loading} speedMultiplier={1} />
                </div>}
                
                {upgraded && <span className="clr--positive">Successfully upgraded to the lifetime subscription.</span>}
            </Fragment>
        )
    }
};

export default WarningModal;