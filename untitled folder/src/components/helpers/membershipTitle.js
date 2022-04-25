import React from "react";
import Translate from "react-translate-component";

export const MembershipTitle = ({title, subtitle, subtitleData}) => (
    <div className="membership__title-wrapper">
        <Translate content={`membership.${title}`} component="h2" className="membership__title" />
        { subtitle && <Translate content={`membership.${subtitle}`} with={subtitleData} className="membership__subtitle" /> }
    </div>
);