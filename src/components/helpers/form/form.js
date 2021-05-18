import React, {Component} from "react";
import {feeCalculator, getPassword} from "../../../actions/forms/index";
import {checkErrors} from "../../../actions/forms/errorsHandling/";

const handleData = async (context, val, id) => {
    const {mutateData, type} = context.props;
    let data = {...context.state.data};
    const feeCalc = feeCalculator[type];

    data[id] = val;

    if(mutateData && mutateData[id]) data = mutateData[id](data);

    const errors = await checkErrors(data);

    if(feeCalc){
        const {feeErr, feeAmount, errVariable} = feeCalc(data);
        if(feeErr) errors[errVariable] = feeErr;
        data['fee'] = feeAmount;
    }

    return {data, errors};
};

class Form extends Component{
    state ={
        loading: false,
        data: this.props.defaultData || {},
        errors: {}
    };

    handleChange = (val, id) => handleData(this, val, id)
        .then((result) => this.setState(result));

    submit = (e) => {

        e && e.preventDefault();
        const {errors, data} = this.state;
        var decimalRegex = /[.]/g

        if(Object.keys(errors).length) return;

        if(this.state.data.quantity <= 0 && this.state.data.quantity !== ''){ 
            this.setState({errors: {quantity: "isZero"}});
            return;
        }
        
        if(decimalRegex.test(this.state.data.quantity)){
            this.setState({errors: {quantity: "isDecimal"}});
            return;
        }
        
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
                this.setState({loading: false}, () => {
                    handleResult(result.callbackData);
                    this.setState({data: this.props.defaultData});
                    this.form.reset();
                });
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
                className={`form${this.state.loading ? ' loading' : ''}${className ? ` ${className}` : ''}`}
                ref={form => this.form = form}
            >
                {children(this)}
            </form>
        )
    }
}

export default Form;