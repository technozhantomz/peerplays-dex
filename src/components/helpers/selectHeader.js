import React from 'react';
import {Caret} from "../../svg";
import Translate from "react-translate-component";

const SelectHeader = ({labelTag, text, className = ''}) => (
    <div className={`field ${className}`}>
        { labelTag && <Translate content={labelTag} className={`field__label${text ? ' squeezed' : ''}`} /> }
        <span className="field__text">
            {text}
        </span>
        <Caret className='field__caret'/>
    </div>
);

export default SelectHeader;