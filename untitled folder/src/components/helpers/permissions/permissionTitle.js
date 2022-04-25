import React from "react";
import Translate from "react-translate-component";

const PermissionTitle = ({type}) => (
    <div className="permissions__title-wrapper">
        <Translate content={`permissions.${type}.title`} component="h2" className="permissions__title" />
        <Translate content={`permissions.${type}.subtitle`} className="permissions__subtitle" />
    </div>
);

export default PermissionTitle;