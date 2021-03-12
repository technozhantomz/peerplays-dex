import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Translate from "react-translate-component";

export const CardHeader = ({title, action, additionalData}) => (
    <div className="card__header">
        <Translate component="div" className="card__title" content={title} with={additionalData}/>
        {action && <button className="card__button" onClick={action}>
            <MoreVertIcon/>
        </button> }
    </div>
);
