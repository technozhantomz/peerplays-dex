import React from "react";
import Translate from "react-translate-component";
import {IconInfo} from "../../svg";

const InfoBlock = ({tag, data, className = ''}) => (
    <div className="info-block">
        <div className="info-block__icon">
            <IconInfo />
        </div>
        <Translate content={tag} with={data} className={ className? className : "info-block__text"} />
    </div>
);

export default InfoBlock;