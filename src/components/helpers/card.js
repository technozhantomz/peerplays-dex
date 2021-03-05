import React from 'react';

export const Card = ({children, mode}) => (
    <div className={`card card--${mode ? mode : ''}`}>
        {children}
    </div>
);
