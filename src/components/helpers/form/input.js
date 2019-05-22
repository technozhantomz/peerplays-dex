import React from 'react';
import FieldWrapper from "./fieldWrapper";

const Input = (props) => {

    const {
        id,
        name = '',
        value,
        type = 'text',
        disabled = false,
        onChange,
        onBlur
    } = props;

    return (
        <FieldWrapper {...props}>
            <input
                id={id ? id : name}
                name={name}
                defaultValue={value[name]}
                type={type}
                disabled={disabled}
                onChange={e => onChange ? onChange(e.target.value, name) : e.preventDefault()}
                onBlur={e => onBlur ? onBlur(e.target.value, name) : e.preventDefault()}
                placeholder=" "
                className="field__input"
                autoComplete="off"
            />
        </FieldWrapper>
    );
};

export default Input;