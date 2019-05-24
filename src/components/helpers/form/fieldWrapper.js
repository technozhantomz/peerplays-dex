import React from 'react';
import Translate from "react-translate-component";

const FieldWrapper = (props) => {

    let {
        id,
        name = '',
        labelTag,
        hideLabel,
        labelParams,
        commentParams,
        comment,
        className,
        style = {},
        formData,
        children
    } = props;

    const value = formData ? formData.state.data : (props.value || {});
    const error = formData ? formData.state.errors : (props.error || {});

    return (
        <label htmlFor={id ? id : name} className={`field ${className}${error[name] ? ' error' : ''}${hideLabel ? ' without-label' : ''}`} style={style}>
            { children }
            { !hideLabel && <Translate content={labelTag ? labelTag : `field.labels.${name}`} with={labelParams} className={`field__label${value[name] ? ' squeezed' : ''}`} /> }
            { error[name] && <Translate content={`errors.${error[name]}`} className="field__error" /> }
            { comment && !error[name] && <Translate content={`field.comments.${name}`} with={commentParams} className="field__comment" /> }
            <span className="field__border" />
        </label>
    );
};

export default FieldWrapper;
