import React, {Component, Fragment} from "react";
import {removeModal} from "../../../dispatch/setModal";

class WarningModal extends Component{

    handleMethod = () => {
        console.log('begin!');
        const {data, method, onSuccess} = this.props;
        method(data).then(result => { if(result.success) onSuccess() });
    };

    render(){
        return(
            <Fragment>
                <div className="modal__header">
                    <h2 className="modal__title">Warning!</h2>
                </div>
                <div>{this.props.text}</div>
                <div className="modal__bottom">
                    <button onClick={removeModal} className="modal__button">Cancel</button>
                    <button onClick={this.handleMethod} className="modal__button">Continue</button>
                </div>
            </Fragment>
        )
    }
};

export default WarningModal;