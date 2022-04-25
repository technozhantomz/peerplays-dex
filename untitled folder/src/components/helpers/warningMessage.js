import React from "react";
import {IconWarning} from "../../svg";
import Translate from "react-translate-component";

const WarningMessage = ({titleTag, titleData, subtitleTag, subtitleData, className}) => (
    <div className={`warning${className ? ` ${className}` : ''}`}>
        <IconWarning/>
        <div className="warning__text-wrapper">
            <Translate content={titleTag} with={titleData}/>
            { subtitleTag && <Translate content={subtitleTag} with={subtitleData}/> }
        </div>
    </div>
);

export default WarningMessage;