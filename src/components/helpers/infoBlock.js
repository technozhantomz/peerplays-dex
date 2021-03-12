import React from "react";
import Translate from "react-translate-component";
import {IconInfo} from "../../svg";

const InfoBlock = ({tag, data}) => (
    <div className="info-block">
        <div className="info-block__icon">
            <IconInfo />
        </div>
        <Translate content={tag} with={data} className="info-block__text" />
    </div>
);

export default InfoBlock;