import React from "react";

export const Radio = ({name, value, text, defaultChecked, callback}) => (
    <div className="assets__radio-wrapper">
        <input className="assets__radio" type="radio" id={value} name={name} value={value} defaultChecked={defaultChecked} onChange={callback}/>
        <label className="assets__label" htmlFor={value}>{text}</label>
    </div>
);
