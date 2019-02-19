import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export const CardHeader = ({title, action}) => (
    <div className="card__header">
        <div className="card__title">
            {title}
        </div>
        <button className="card__button" onClick={action}>
            <MoreVertIcon/>
        </button>
    </div>
);
