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
   onChange
}) => (
    <div className={`field ${className}${error ? ' error' : ''}`}>
        <input
            name={name}
            defaultValue={value[name]}
            type={type}
            disabled={disabled}
            onChange={e => onChange ? onChange(e.target.value, name) : e.preventDefault()}
            placeholder=" "
            className="field__input"
        />
        { labelTag && <Translate content={labelTag} className={`field__label${value[name] ? ' squeezed' : ''}`} /> }
        { error[name] && <Translate content={`errors.${error[name]}`} className="field__error" /> }
        { comment && !error && <Translate content={comment} className="field__comment" /> }
    </div>
);

export default Input;