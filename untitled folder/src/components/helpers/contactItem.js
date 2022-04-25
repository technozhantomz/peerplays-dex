import React from 'react';
import Avatar from "./avatar";
import {Link} from "react-router-dom";

export const ContactItem = ({data, actions, handleClick = e => e.preventDefault}) => (
    <div className="contact">
        <Avatar userName={data.name}/>
        <div className="contact__content">
            <Link to={`/user/${data.name}`} onClick={handleClick} className="contact__data">
                <span className="contact__name">
                    {data.name}
                </span>
                    <span className="contact__id">
                    {data.id}
                </span>
            </Link>
            {actions}
        </div>
    </div>
);