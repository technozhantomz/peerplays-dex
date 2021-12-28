import React from "react";
import FieldWrapper from "./fieldWrapper";

const ControlledInput = (props) => {

    let {
        id,
        name = '',
        type = 'text',
        disabled = false,
        onFocus,
        onBlur,
        formData,
        readOnly
    } = props;

    let onChange = formData ? formData.handleChange : props.onChange;

    if(disabled) onChange = '';

    const value = formData ? formData.state.data : (props.value || {});

    return (
        <FieldWrapper {...props}>
            <input
                id={id ? id : name}
                name={name}
                defaultValue={value[name] || ''}
                type={type}
                disabled={disabled}
                onFocus={e => onFocus ? onFocus(e.target.value, name) : e.preventDefault()}
                onChange={e => onChange ? onChange(e.target.value, name) : e.preventDefault()}
                onClick={e => onChange ? onChange(e.target.value, name) : e.preventDefault()}
                onBlur={e => onBlur ? onBlur(e.target.value, name) : e.preventDefault()}
                placeholder=" "
                className="field__input"
                autoComplete="off"
                readOnly={readOnly}
            />
        </FieldWrapper>
    );
};

export default ControlledInput;