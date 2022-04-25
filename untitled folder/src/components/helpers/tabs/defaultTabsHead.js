import React from "react";
import Translate from "react-translate-component";

const DefaultTabsHead = ({head, activeTab, callback}) => (
    <div className="tabs__head">
        {head.map((el, id) => (
            <Translate
                key={id}
                id={el}
                component="button"
                content={`tabs.${el}`}
                className={`tabs__head-item${activeTab === id ? ' active' : ''}`}
                onClick={callback}
            />
        ))}
    </div>
);

export default DefaultTabsHead;