import React from 'react';
import FieldWrapper from "./fieldWrapper";

const Input = (props) => {

    const {
        id,
        name = '',
        type = 'text',
        disabled = false,
        formData,
        onBlur
    } = props;

    let onChange = formData ? formData.handleChange : props.onChange;

    if(disabled) onChange = '';

    const value = formData ? formData.state.data : (props.value || {});

    return (
        <FieldWrapper {...props}>
            <input
                id={id ? id : name}
                name={name}
                value={value[name]}
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