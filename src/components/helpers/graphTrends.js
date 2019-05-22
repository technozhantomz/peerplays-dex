import React from 'react';
import {Area, AreaChart} from "recharts";

const data = [
    {name: 'Page A', uv: 1200, pv: 3000, amt: 2400},
    {name: 'Page B', uv: 1300, pv: 2900, amt: 2210},
    {name: 'Page C', uv: 1400, pv: 2950, amt: 2290},
    {name: 'Page D', uv: 1500, pv: 2500, amt: 2000},
    {name: 'Page E', uv: 1600, pv: 2700, amt: 2181},
    {name: 'Page F', uv: 1550, pv: 2400, amt: 2500},
    {name: 'Page G', uv: 1700, pv: 2450, amt: 2100},
    {name: 'Page A', uv: 2000, pv: 2000, amt: 2400},
    {name: 'Page B', uv: 2400, pv: 1900, amt: 2210},
    {name: 'Page C', uv: 2300, pv: 1750, amt: 2290},
    {name: 'Page D', uv: 2500, pv: 1800, amt: 2000},
    {name: 'Page E', uv: 2600, pv: 1600, amt: 2181},
    {name: 'Page F', uv: 2800, pv: 1500, amt: 2500},
    {name: 'Page G', uv: 2900, pv: 1400, amt: 2100}
];

export const GraphTrends = () => (
    <div className="card__content">
        <div className="graph__names">
            <div>BTC</div>
            <div>BTS</div>
        </div>
        <div className="graph">
            <AreaChart width={640} height={236} data={data}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="25%" stopColor="#6B37DD" stopOpacity={0.3}/>
                        <stop offset="85%" stopColor="#6B37DD" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="25%" stopColor="#FF28F1" stopOpacity={0.3}/>
                        <stop offset="85%" stopColor="#FF28F1" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Area
                    type='monotone'
                    dataKey='uv'
                    fillOpacity={1}
                    stroke='#FF28F1'
                    fill="url(#colorPv)"
                    isAnimationActive={false}
                />
                <Area
                    type='monotone'
                    dataKey='pv'
                    fillOpacity={1}
                    stroke='#6B37DD'
                    fill="url(#colorUv)"
                    isAnimationActive={false}
                />
            </AreaChart>
        </div>
    </div>
);