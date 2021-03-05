import React from "react";
import Translate from "react-translate-component";

const NoData = ({tag}) => <Translate content={tag ? tag : 'emptyPage.default'} className="no-data" />;

export default NoData;