import React from 'react';
import Translate from "react-translate-component";

const Switcher = ({id, name, className, label, selected, handleChange}) => {

    const forId = name ? `${name}-${id}` : id;

    return(
        <label htmlFor={forId} className={`switch${selected ? ' switch--selected' : ''}${className ? ` ${className}` : ''}`}>
            <input id={forId} type="checkbox" onChange={e => handleChange(e.target.checked, id)} checked={selected} />
            <span className="switch__icon" />
            <Translate content={label} className="switch__title" />
        </label>
    )
};

export default Switcher;