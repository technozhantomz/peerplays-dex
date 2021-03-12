import React from 'react';

export const ActionsPanel = ({hover, instant}) => (
    <div className="contact__icons actions__wrapper">
        <div className="actions__on-hover">
            {hover.map(el => el)}
        </div>
        {instant.map(el => el)}
    </div>
);