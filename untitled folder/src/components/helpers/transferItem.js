import React from 'react';

const TransferItem = ({data}) => (
    <div className="operation__row">
        <div className="title">{data.key}</div>
        <div className="content">{data.value}</div>
    </div>
);

export default TransferItem;