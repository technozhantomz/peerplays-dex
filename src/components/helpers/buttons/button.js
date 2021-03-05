import React from "react";
import Translate from "react-translate-component";

const Button = ({className, tag, type = "button", onClick}) => (
    <Translate
        component="button"
        type={type}
        className={`${className ? className : ''}`}
        content={`buttons.${tag}`}
        onClick={onClick}
    />
);

export default Button;