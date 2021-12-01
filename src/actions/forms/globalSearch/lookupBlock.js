import React from "react";
import Link from "react-router-dom/es/Link";
import {clearLayout} from "../../../dispatch/layoutDispatch";
import {dbApi} from "../../nodes";
import BlockHeader from "../../../components/helpers/blockHeader";
// Configs
export const BLOCK_TO_VALUE = 100;

export const lookupBlock = async val => {
    return +val ? dbApi('get_blocks', [val, (parseInt(val) + BLOCK_TO_VALUE).toString()]).then(info => {
        if (!info) return 'No result Found';
        return (
            <span className="global-search__card card grid__cade">
                    <BlockHeader num={val} data={info}/>
                </span>
        )
    }) : 'You can only search with block number'
};
