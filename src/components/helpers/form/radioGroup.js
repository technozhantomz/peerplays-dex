import React, {Component} from 'react';
import {Radio} from "../radio";
import Translate from "react-translate-component";

class RadioGroup extends Component{

    handleChange = (e) => {
        const elem = e.target;
        const handleChange = this.props.onChange;
        handleChange && handleChange(elem.value, elem.name);
    };

    render() {
        const {name, list} = this.props;
        return (
            <div className="radio-group">
                {list.map((elem, id) => (
                    <Radio
                        key={elem}
                        name={name}
                        value={elem}
                        text={<Translate content={`field.radio.${elem}`} />}
                        defaultChecked={id === 0}
                        callback={this.handleChange}
                    />
                ))}
            </div>
        )
    }
}

export default RadioGroup;