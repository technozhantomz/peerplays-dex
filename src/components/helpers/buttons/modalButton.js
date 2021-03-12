import React from "react";
import Button from "./button";

const ModalButton = props => {
    let className = 'modal__button';
    if(props.className) className = `${className} ${props.className}`;
    return <Button {...props} className={className} />;
};

export default ModalButton;