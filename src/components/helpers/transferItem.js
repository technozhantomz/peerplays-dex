import React from 'react';

const TransferItem = ({data}) => (
    <div className="operation__row">
        <div className="title">{data.key}</div>
        {data.key == 'fee'?<div className="content">{data.value.replace('TEST','PPY')}</div>
        :
        <div className="content">{data.value}</div>}
        
    </div>
);

export default TransferItem;