import React from "react";
import Translate from "react-translate-component";
import {IconCheck} from "../../svg";


const CheckBox = ({id = '', labelTag = '', value = '', className = '', onChange, disabled = false}) => {
    return(
        <label htmlFor={id} className={`checkbox${value[id] ? ' checkbox--selected' : ''}${className ? ` ${className}` : ''}${disabled ? ' disabled' : ''}`}>
            <input id={id} type="checkbox" defaultChecked={value[id]} onChange={e => onChange ? onChange(e.target.checked, id) : e.preventDefault()} disabled={disabled}/>
            {labelTag && <Translate content={labelTag} className="checkbox__label" />}
            <IconCheck />
        </label>
    )
};

export default CheckBox;