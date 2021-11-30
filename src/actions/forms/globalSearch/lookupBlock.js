import React from "react";
import Link from "react-router-dom/es/Link";
import {clearLayout} from "../../../dispatch/layoutDispatch";
import {dbApi} from "../../nodes";
import BlockHeader from "../../../components/helpers/blockHeader";

export const lookupBlock = val => dbApi('get_blocks', [val,(parseInt( val ) + parseInt(process.env.BLOCK_TO_VALUE)).toString()]).then(async info => {
    if(!info) return 'No result Found';
    return (
        <span className="global-search__card card grid__cade">
            <BlockHeader num={val} data={info} />
        </span>
    )
});
