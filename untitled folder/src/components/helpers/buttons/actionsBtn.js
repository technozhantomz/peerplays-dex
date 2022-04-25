import React from 'react';
import Dropdown from "../form/dropdown";
import {IconMore} from "../../../svg/index";

const ActionsBtn = ({actionsList}) => (
    <Dropdown
        btn={<IconMore className="btn btn--icon" />}
        list={actionsList}
        position="top-center"
    />
);

export default ActionsBtn;