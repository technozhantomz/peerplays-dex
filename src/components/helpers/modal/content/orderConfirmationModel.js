import React, {Component, Fragment} from "react";
import Close from "../decoration/close";

class OrderConfirmationModel extends Component{

    handleMethod = () => {
        const {onSuccess} = this.props;
        onSuccess();
    };

    render(){
        console.log("I am here for final props", this.props);
        return(
            <Fragment>
                <div className="modal__header">
                    <h2 className="modal__title">Confirmation!</h2>
                </div>
                <div>Are you sure you want to continue?</div>
                <div className="modal__bottom">
                    <Close />
                    <button onClick={this.handleMethod} className="modal__button">Continue</button>
                </div>
            </Fragment>
        )
    }
};

export default OrderConfirmationModel;
