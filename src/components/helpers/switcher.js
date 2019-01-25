import React from 'react';
import Translate from "react-translate-component";

const Switcher = ({id, label, selected, handleChange}) => {
    return(
        <label htmlFor={id} className={`switch${selected ? ' switch--selected' : ''}`}>
            <input id={id} type="checkbox" onChange={handleChange} checked={selected} />
            <span className="switch__icon" />
            <Translate content={label} className="switch__title" />
        </label>
    )
};

export default Switcher;