import React from 'react';
import Avatar from "./avatar";

export const ContactItem = ({data, actions}) => (
    <div className="contact">
        <Avatar userName={data.name}/>
        <div className="contact__content">
            <div className="contact__data">
                <span className="contact__name">
                    {data.name}
                </span>
                    <span className="contact__id">
                    {data.id}
                </span>
            </div>
            {actions}
        </div>
    </div>
);