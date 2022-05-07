import React from "react";
import dataFetch from "../dataFetch";
import {fetchPermissions} from "../../../actions/dataFetching/accountData/fetchPermissions";

const Permissions = ({data}) => (
    <div></div>
);

export default dataFetch(fetchPermissions)(Permissions);