import React from 'react';
import Translate from "react-translate-component";

const Input = ({
   name = '',
   labelTag,
   value,
   type = 'text',
   comment = '',
   className = '',
   error = '',
   disabled = false,
   onChange,
   onBlur
}) => (
    <label htmlFor={name} className={`field ${className}${error[name] ? ' error' : ''}${!labelTag ? ' without-label' : ''}`}>
        <input
            id={name}
            name={name}
            defaultValue={value[name]}
            type={type}
            disabled={disabled}
            onChange={e => onChange ? onChange(e.target.value, name) : e.preventDefault()}
            onBlur={e => onBlur ? onBlur(e.target.value, name) : e.preventDefault()}
            placeholder=" "
            className="field__input"
        />
        { labelTag && <Translate content={labelTag} className={`field__label${value[name] ? ' squeezed' : ''}`} /> }
        { error && error[name] && <Translate content={`errors.${error[name]}`} className="field__error" /> }
        { comment && error && !error[name] && <Translate content={comment} className="field__comment" /> }
    </label>
);

export default Input;