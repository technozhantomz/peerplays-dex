import React, {Component} from "react";
import DatePicker from "react-datepicker";
import FieldWrapper from "./fieldWrapper";

class DateField extends Component{
    state = {
        date: this.props.value[this.props.name]
    };

    handleChange = (date) =>  this.setState({date}, () => this.props.onChange(date, this.props.name));

    render(){
        const val = {[this.props.name]: this.state.date};

        return(
            <FieldWrapper value={val} {...this.props}>
                <DatePicker
                    className="field__input"
                    selected={this.state.date}
                    onChange={this.handleChange}
                />
            </FieldWrapper>
        )
    }
}

export default DateField;