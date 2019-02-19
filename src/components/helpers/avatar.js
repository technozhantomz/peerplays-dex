import React from 'react';

const Avatar = ({userName = 'default'}) => (
    <div className="avatar">
        <img src={`https://robohash.org/${userName}`} alt="user avatar" />
    </div>
);

export default Avatar;