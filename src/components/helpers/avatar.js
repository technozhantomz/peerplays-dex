import React from 'react';

const Avatar = ({userName, image}) => (
    <div className="avatar">
        {image
            ? <img src={image} alt=""/>
            : <span>{userName.substr(0, 1).toUpperCase()}</span>
        }
    </div>
);

export default Avatar;