import React, {Component} from "react";

class Form extends Component{
    state ={
        loading: false,
        data: {},
        errors: {}
    };

    handleChange = (val, id) => {
        const data = {...this.state.data};
        const errors = {};
        data[id] = val;
        this.setState({data, errors});
    };

    submit = (e) => {
        e.preventDefault();

        const {errors, data} = this.state;

        if(Object.keys(errors).length) return;

        this.props.requiredFields && this.props.requiredFields
            .filter(el => !data[el])
            .forEach(el => errors[el] = 'required');

        if(Object.keys(errors).length){
            this.setState({errors});
            return;
        }

        const {action, handleResult} = this.props;

        if(action){
            this.setState({loading: true});
            action(data).then(result => {
                if(!result.success){
                    this.setState({loading: false, errors: result.errors});
                    return;
                }
                this.setState({loading: false}, () => handleResult(result));
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