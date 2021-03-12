import React from "react";
import Button from "./button";

const RoundButton = props => {
    let className = 'btn-round';
    if(props.className) className = `${className} ${props.className}`;
    return <Button {...props} className={className} />;
};

export default RoundButton;

