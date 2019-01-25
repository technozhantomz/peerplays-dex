import React from "react";
import Translate from "react-translate-component";
import {IconCheck} from "../../svg";


const CheckBox = ({id = '', labelTag = '', value = '', className = '', onChange = e => e.preventDefault(), disabled = false}) => {
    return(
        <label htmlFor={id} className={`checkbox${value ? ' checkbox--selected' : ''}${className ? ` ${className}` : ''}${disabled ? ' disabled' : ''}`}>
            <input id={id} type="checkbox" defaultChecked={value} onClick={onChange} disabled={disabled}/>
            {labelTag && <Translate content={labelTag} className="checkbox__label" />}
            <IconCheck />
        </label>
    )
};

export default CheckBox;