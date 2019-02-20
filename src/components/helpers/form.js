import React, {Component} from "react";
import {feeCalculator, getPassword} from "../../actions/forms";

class Form extends Component{
    state ={
        loading: false,
        data: this.props.defaultData || {},
        errors: {}
    };

    handleChange = (val, id) => {
        const data = {...this.state.data};
        const feeCalc = feeCalculator[this.props.type];
        const errors = {};

        data[id] = val;


        if(feeCalc){
            const {feeErr, feeAmount} = feeCalc(data);
            if(feeErr) errors['quantity'] = feeErr;
            data['fee'] = feeAmount;
        }

        this.setState({data, errors});
    };

    submit = (e) => {

        e && e.preventDefault();
        const {errors, data} = this.state;

        if(Object.keys(errors).length) return;

        this.props.requiredFields && this.props.requiredFields
            .filter(el => !data[el])
            .forEach(el => errors[el] = 'required');

        if(Object.keys(errors).length){
            this.setState({errors});
            return;
        }

        if(this.props.needPassword && !data.password) {
            getPassword(password => (
                this.setState(
                    {data: {...data, password}},
                    () => this.handleAction()
                )
            ));
            return;
        }

        this.handleAction();
    };

    handleAction = () => {
        const data = this.state.data;
        const {action, handleResult} = this.props;

        if(action){

            const result = {
                success: false,
                errors: {},
                callbackData: ''
            };

            this.setState({loading: true});

            action(data, result).then(result => {
                if(!result.success){
                    this.setState({loading: false, errors: result.errors});
                    return;
                }
                this.setState({loading: false}, () => handleResult(result.callbackData));
            });
        } else if(handleResult) {
            handleResult(this.state.data);
        }
    };

    render(){

        const {className, children} = this.props;

        return(
            <form
                onSubmit={this.submit}
                className={`${this.state.loading ? 'loading ' : ''}${className ? className : ''}`}
            >
                {children(this)}
            </form>
        )
    }
}

export default Form;