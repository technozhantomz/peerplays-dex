import React from 'react';
import {CardHeader} from "./cardHeader";
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
    {name: '6M', uv: 1890, amt: 2181}
];

export const SmallCardContent = ({}) => (
    <div>
        <CardHeader title={'BTS : ETH'}/>
        <div className="card__content small__content">
            <div className="number small__content--positive">
                1000000,000000
            </div>
            <AreaChart width={193} height={60} data={data}>
                <defs>
                    <linearGradient id="colorUy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="15%" stopColor="#2EBD41" stopOpacity={0.3}/>
                        <stop offset="85%" stopColor="#2EBD41" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="uv" stroke="#2EBD41" fillOpacity={1} fill="url(#colorUy)"/>
            </AreaChart>
            <div className="blocks">
                <div className="block">
                    <div className="block__title">
                        24H Volume
                    </div>
                    <div className="block__number">
                        38.06945307
                    </div>
                </div>
                <div className="block">
                    <div className="block__title">
                        Chаnge
                    </div>
                    <div className="block__number small__content--positive">
                        -0.71%
                    </div>
                </div>
            </div>
        </div>
    </div>
);
