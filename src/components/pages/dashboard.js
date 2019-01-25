import React, {Component} from 'react';
import {CardHeader} from "../helpers/cardHeader";
import {Area, AreaChart, Cell, Pie, PieChart, XAxis} from "recharts";
import {Card} from "../helpers/card";
import {SmallCardContent} from "../helpers/smallCardContent";
import Add from '@material-ui/icons/Add';
import {TableRow} from "../helpers/tableRow";
import {TableHeader} from "../helpers/tableHeader";
import {TableRowOders} from "../helpers/tableRowOders";


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

const data03 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
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

class Dashboard extends Component {


    render() {
        return (
            <div className='container'>
                <div className="card__list">
                    <Card mode="small bg-danger">
                        <SmallCardContent/>
                    </Card>
                    <Card mode="small bg-success">
                        <SmallCardContent/>
                    </Card>
                    <Card mode="small bg-danger">
                        <SmallCardContent/>
                    </Card>
                    <Card mode="small">
                        <SmallCardContent/>
                    </Card>
                    <Card mode="small bg-danger">
                        <SmallCardContent/>
                    </Card>
                    <Card mode="small bg-success">
                        <SmallCardContent/>
                    </Card>
                    <button className="plus"><Add/></button>
                </div>


                <div className="graphs">
                    <Card mode="graph">
                        <CardHeader title={'Margin Positions'}/>
                        <div className="card__content">
                            <div className="graph_dots">
                                <div>1D</div>
                                <div>1W</div>
                                <div>1M</div>
                                <div>3M</div>
                                <div>6M</div>
                                <div>1Y</div>
                            </div>
                            <div className="graph">
                                <AreaChart width={390} height={236} data={data}>
                                    {/*<XAxis dataKey="name" orientation="top" tick={{fill: 'rgba(0,0,0,0.38)', strokeWidth: 0}}/>*/}
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="25%" stopColor="#de2021" stopOpacity={0.3}/>
                                            <stop offset="85%" stopColor="#de2021" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Area dataKey="uv" stroke="#de2021" fillOpacity={1} fill="url(#colorUv)"/>
                                </AreaChart>
                            </div>
                        </div>
                    </Card>
                    <Card mode="graph">
                        <CardHeader title={'Something Else'}/>
                        <div className="card__content">
                            <div className="graph_dots">
                                <div>1D</div>
                                <div>1W</div>
                                <div>1M</div>
                                <div>3M</div>
                                <div>6M</div>
                                <div>1Y</div>
                            </div>
                            <div className="graph">
                                <AreaChart width={390} height={236} data={data}>
                                    {/*<XAxis dataKey="name" orientation="top" tick={{fill: 'rgba(0,0,0,0.38)', strokeWidth: 0}}/>*/}
                                    <defs>
                                        <linearGradient id="colorUy" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="25%" stopColor="#fdc228" stopOpacity={0.3}/>
                                            <stop offset="85%" stopColor="#fdc228" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Area dataKey="uv" stroke="#fdc228" fillOpacity={1} fill="url(#colorUy)"/>
                                </AreaChart>
                            </div>
                        </div>
                    </Card>
                    <Card mode="graph">
                        <CardHeader title={'My Assets'}/>
                        <div className="card__content graph__pie">
                            <PieChart width={270} height={270} onMouseEnter={this.onPieEnter}>
                                <Pie data={data03} dataKey='value' cx={135} cy={135} innerRadius={55} outerRadius={105}
                                     fill="#8884d8"
                                     labelLine={false}
                                     label={renderCustomizedLabel}
                                     animationDuration={800}
                                >
                                    {
                                        data03.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}
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
                    </Card>
                </div>

                <div className="tables">
                    <Card mode="table">
                        <CardHeader title={'My Activity'}/>
                        <table className="dashboard__table">
                            <tbody>
                                <TableRow/>
                                <TableRow/>
                                <TableRow/>
                            </tbody>
                        </table>
                    </Card>
                    <Card mode="table">
                        <CardHeader title={'Open Orders'}/>
                        <table className="dashboard__table">
                            <thead>
                                <TableHeader/>
                            </thead>
                            <tbody>
                                <TableRowOders/>
                                <TableRowOders/>
                                <TableRowOders/>
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Dashboard;
