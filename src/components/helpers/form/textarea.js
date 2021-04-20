import React from 'react';
import FieldWrapper from "./fieldWrapper";

const Textarea = (props) => {

    const {
        name = '',
        value,
        disabled = false,
        onChange,
    } = props;

    return (
        <FieldWrapper {...props}>
            <textarea
                id={name}
                name={name}
                value={value[name]}
                disabled={disabled}
                onChange={e => onChange ? onChange(e.target.value, name) : e.preventDefault()}
                placeholder=" "
                className="field__input"
            />
        </FieldWrapper>
    );
};

export default Textarea;