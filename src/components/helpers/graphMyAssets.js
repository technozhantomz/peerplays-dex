import React from 'react';
import {Cell, Pie, PieChart} from "recharts";

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
    {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5 - 11;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export const GraphMyAssets = () => (
    <div className="card__content graph__pie">
        <PieChart width={270} height={270} onMouseEnter={this.onPieEnter}>
            <Pie data={data} dataKey='value' cx={135} cy={135} innerRadius={55} outerRadius={105}
                 fill="#8884d8"
                 labelLine={false}
                 label={renderCustomizedLabel}
                 animationDuration={800}
            >
                {
                    data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}
                                                       key={index}/>)
                }
            </Pie>
        </PieChart>
        <div className="pie__dots">
            <div className="dot">
                <span className="circle"/>
                Bitcoin
            </div>
            <div className="dot">
                <span className="circle"/>
                Dollars
            </div>
            <div className="dot">
                <span className="circle"/>
                Ethereum
            </div>
            <div className="dot">
                <span className="circle"/>
                Euros
            </div>
        </div>
    </div>
);