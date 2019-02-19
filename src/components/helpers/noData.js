import React from "react";
import Translate from "react-translate-component";

const NoData = ({tag}) => <Translate content={tag ? tag : 'empty.default'} className="no-data" />;

export default NoData;