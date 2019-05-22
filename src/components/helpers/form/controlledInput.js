import React from "react";
import FieldWrapper from "./fieldWrapper";

const ControlledInput = (props) => {

    const {
        id,
        name = '',
        value,
        type = 'text',
        disabled = false,
        onChange,
        onFocus,
        onBlur
    } = props;

    return (
        <FieldWrapper {...props}>
            <input
                id={id ? id : name}
                name={name}
                value={value[name] || ''}
                type={type}
                disabled={disabled}
                onFocus={e => onFocus ? onFocus(e.target.value, name) : e.preventDefault()}
                onChange={e => onChange ? onChange(e.target.value, name) : e.preventDefault()}
                onBlur={e => onBlur ? onBlur(e.target.value, name) : e.preventDefault()}
                placeholder=" "
                className="field__input"
                autoComplete="off"
            />
        </FieldWrapper>
    );
};

export default ControlledInput;