import React, {Component, Fragment} from 'react';
import {PieChart, Pie, Sector, Cell} from "recharts";

const RADIAN = Math.PI / 180;
const data1 = [
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}
];
const data2 = [
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1}, {flag: 0, value: 1},
    {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1},
    {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1},
    {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1},
    {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1},
    {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1},
    {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1}, {flag: 1, value: 1}
]

const COLORS = ['#41D83B', '#E2E2E2'];
const COLORS2 = ['#9939CD', '#E2E2E2'];

class OpenOrders extends Component {
    render() {
        return (
            <div className="pie">
                <div className="pie__info pie__info--first">
                    <span>900.00</span>
                    <span className="pie__percent">100%</span>
                </div>
                <div className="pie__info pie__info--second">
                    <span>567.23</span>
                    <span className="pie__percent">70%</span>
                </div>
                <PieChart width={600} height={236} onMouseEnter={this.onPieEnter}>
                    <Pie
                        data={data1}
                        cx={155}
                        cy={118}
                        innerRadius={70}
                        outerRadius={100}
                        fill="#41D83B"
                        paddingAngle={1}
                        startAngle={90}
                        endAngle={-270}
                    >
                        {
                            data1.map((el, index) => <Cell fill={COLORS[el.flag]}/>)
                        }
                    </Pie>
                    <Pie
                        data={data2}
                        cx={445}
                        cy={118}
                        innerRadius={70}
                        outerRadius={100}
                        fill="#41D83B"
                        paddingAngle={1}
                        startAngle={90}
                        endAngle={-270}
                    >
                        {
                            data2.map((el, index) => <Cell fill={COLORS2[el.flag]}/>)
                        }
                    </Pie>
                </PieChart>
                <div className="pie__labels">
                    <span>
                        BitUSD > BTS
                    </span>
                    <span>
                        BTS > BTC
                    </span>
                </div>
            </div>
        )
    }
}

export default OpenOrders;