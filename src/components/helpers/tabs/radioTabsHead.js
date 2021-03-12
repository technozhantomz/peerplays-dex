import React from "react";
import {Radio} from "../radio";
import Translate from "react-translate-component";

const RadioTabsHead = ({head, activeTab, callback}) => (
    <div className="tabs__head">
        {head.map((elem, id) => (
            <Radio
               key={elem}
               name='tableHead'
               value={elem}
               text={<Translate content={`tabs.${elem}`} />}
               defaultChecked={id === 0}
               callback={callback}
            />
        ))}
    </div>
);

export default RadioTabsHead;