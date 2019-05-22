import React from 'react';
import Translate from "react-translate-component";

const FieldWrapper = ({
    id,
    name = '',
    labelTag,
    hideLabel,
    labelParams,
    commentParams,
    value = {},
    comment,
    className,
    error = {},
    style = {},
    children
}) => (
    <label htmlFor={id ? id : name} className={`field ${className}${error[name] ? ' error' : ''}${hideLabel ? ' without-label' : ''}`} style={style}>
        { children }
        { !hideLabel && <Translate content={labelTag ? labelTag : `field.labels.${name}`} with={labelParams} className={`field__label${value[name] ? ' squeezed' : ''}`} /> }
        { error[name] && <Translate content={`errors.${error[name]}`} className="field__error" /> }
        { comment && !error[name] && <Translate content={`field.comments.${name}`} with={commentParams} className="field__comment" /> }
        <span className="field__border" />
    </label>
);

export default FieldWrapper;
