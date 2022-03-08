import React from 'react';
import FieldWrapper from "./fieldWrapper";

const Input = (props) => {

    const {
        id,
        name = '',
        type = 'text',
        disabled = false,
        formData,
        onKeyPress,
        onBlur
    } = props;

    let onChange = formData ? formData.handleChange : props.onChange;

    let isNumberKey = (e)=>{
        var charCode = (e.which) ? e.which : e.keyCode
        if (charCode === 43 || charCode === 45 || charCode === 101 ){
             return e.preventDefault()
        }
        }

    if(disabled) onChange = '';

    const value = formData ? formData.state.data : (props.value || {});

    return (
        <FieldWrapper {...props}>
            <input
                id={id ? id : name}
                name={name}
                defaultValue={value[name]}
                type={type}
                disabled={disabled}
                onKeyPress={e => isNumberKey(e)}
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