import React from "react";
import Translate from "react-translate-component";

const TitleWrapper = ({title, titleData, subtitle, subtitleData, className}) => (
    <div className={`title${className ? ` ${className}` : ''}`}>
        <Translate content={title} with={titleData} className="title__text" component="h2" />
        {subtitle &&
            <Translate content={subtitle} with={subtitleData} className="title__subtitle" component="div" />
        }
    </div>
);

export default TitleWrapper;