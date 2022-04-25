import React from 'react';
import FieldWrapper from "./fieldWrapper";

const Textarea = (props) => {

    const {
        name = '',
        value,
        disabled = false,
        onChange,
        maxLength,
    } = props;

    return (
        <FieldWrapper {...props}>
            <textarea
                maxLength={maxLength}
                id={name}
                name={name}
                defaultValue={value[name]}
                disabled={disabled}
                onChange={e => onChange ? onChange(e.target.value, name) : e.preventDefault()}
                placeholder=" "
                className="field__input"
            />
        </FieldWrapper>
    );
};

export default Textarea;