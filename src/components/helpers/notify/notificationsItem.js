import Avatar from "../avatar";
import Translate from "react-translate-component";
import React from "react";
import {IconWarning} from "../../../svg/index";

const NotificationsItem = ({data}) => (
    <div className={`notify__item${data.error ? ' error' : ''}`}>
        {data.error
            ? <div className="avatar"><IconWarning/></div>
            : <Avatar userName={data.data.author} />
        }
        <div className="notify__data">
            <Translate content={`tableInfo.${data.type}.description`} className="notify__text" with={data.data} />
            <div className="notify__date-wrapper">
                <span className="notify__date">{data.timestamp.date}</span>
                <span className="notify__time">{data.timestamp.time}</span>
            </div>
        </div>
    </div>
);

export default NotificationsItem;