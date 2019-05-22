import React from 'react';
import {Caret} from "../../svg";
import Translate from "react-translate-component";

const SelectHeader = ({labelTag, text, className = '', error, style = {}}) => (
    <div className={`field ${className}${!labelTag ? ' without-label' : ''}`} style={style}>
        { labelTag && <Translate content={labelTag} className={`field__label${text || text === 0 ? ' squeezed' : ''}`} /> }
        <span className="field__text">
            {text}
        </span>
        <span className="field__border" />
        <Caret className='field__caret'/>
        { error && <Translate content={`errors.${error}`} className="field__error" /> }
    </div>
);

export default SelectHeader;