import React from 'react';
import Translate from "react-translate-component";

const Textarea = ({
  name = '',
  labelTag,
  value,
  comment = '',
  className = '',
  error = '',
  disabled = false,
  onChange
}) => (
    <label htmlFor={name} className={`field ${className}${error[name] ? ' error' : ''}${!labelTag ? ' without-label' : ''}`}>
        <textarea
            id={name}
            name={name}
            defaultValue={value[name]}
            disabled={disabled}
            onChange={e => onChange ? onChange(e.target.value, name) : e.preventDefault()}
            placeholder=" "
            className="field__input"
        />
        { labelTag && <Translate content={labelTag} className={`field__label${value[name] ? ' squeezed' : ''}`} /> }
        { error[name] && <Translate content={`errors.${error[name]}`} className="field__error" /> }
        { comment && !error[name] && <Translate content={comment} className="field__comment" /> }
    </label>
);

export default Textarea;