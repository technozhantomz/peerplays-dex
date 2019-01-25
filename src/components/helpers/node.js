import React from 'react';
import {IconConnectedNode, IconMore, IconNode} from "../../svg";

const Node = ({data, handleActivation}) => (
    <div className="node">
        <div className="node__primary-data">
            <button
                onClick={e => handleActivation ? handleActivation(data) : e.preventDefault()}
                disabled={data.connectTime === 0 || !handleActivation}
            >
                { handleActivation ? <IconNode /> : <IconConnectedNode /> }
            </button>
            <div className="node__group">
                <span className="node__group-title">{data.location}</span>
                <span className="node__group-subtitle">{data.url}</span>
            </div>
        </div>
        <div className="node__group">
            <span className={`node__group-title clr--${data.connectTime !== 0 && data.connectTime < 500 ? 'positive' : 'negative'}`}>
                {data.connectTime}ms
            </span>
            <span className="node__group-subtitle">Latency</span>
        </div>
        <div className="node__group">
            <span className="node__group-title">{data.user.name}</span>
            <span className="node__group-subtitle">{data.user.status}</span>
        </div>
        <button className="btn btn--icon">
            <IconMore />
        </button>
    </div>
);

export default Node;