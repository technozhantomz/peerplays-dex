import React from 'react';
import {Area, AreaChart} from "recharts";

const data = [
    {name: '', uv: 3300, amt: 2100},
    {name: '1D', uv: 4000, amt: 2400},
    {name: '1W', uv: 3000, amt: 2210},
    {name: '1M', uv: 2000, amt: 2290},
    {name: '3M', uv: 2780, amt: 2000},
    {name: '6M', uv: 1890, amt: 2181},
    {name: '1Y', uv: 2390, amt: 2500},
    {name: '2Y', uv: 3490, amt: 2100},
    {name: '', uv: 3190, amt: 2300},
    {name: '1D', uv: 4000, amt: 2400},
    {name: '1W', uv: 3000, amt: 2210},
    {name: '1M', uv: 2000, amt: 2290},
    {name: '1D', uv: 4000, amt: 2400},
    {name: '1W', uv: 3000, amt: 2210},
    {name: '1M', uv: 2000, amt: 2290},
    {name: '3M', uv: 2780, amt: 2000},
    {name: '6M', uv: 1890, amt: 2181},
    {name: '1Y', uv: 2390, amt: 2500},
    {name: '2Y', uv: 3490, amt: 2100},
    {name: '', uv: 3190, amt: 2300},
    {name: '3M', uv: 2780, amt: 2000},
    {name: '6M', uv: 1890, amt: 2181},
    {name: '1Y', uv: 2390, amt: 2500},
    {name: '2Y', uv: 3490, amt: 2100},
    {name: '', uv: 3190, amt: 2300}
];

export const GraphBtsBtc = () => (
    <div className="card__content">
        <div className="graph__dots">
            <div>1D</div>
            <div>1W</div>
            <div className="selected">1M</div>
            <div>3M</div>
            <div>6M</div>
            <div>1Y</div>
        </div>
        <div className="graph">
            <AreaChart width={416} height={236} data={data}>
                <defs>
                    <linearGradient id="colorUy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="25%" stopColor="#2EBD41" stopOpacity={0.3}/>
                        <stop offset="85%" stopColor="#2EBD41" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Area
                    dataKey="uv"
                    stroke="#2EBD41"
                    fillOpacity={1}
                    fill="url(#colorUy)"
                    isAnimationActive={false}
                />
            </AreaChart>
        </div>
    </div>
);