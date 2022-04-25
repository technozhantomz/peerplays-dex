import React, {Component, Fragment} from 'react';
import {store} from '../../index';
import {Cell, Pie, PieChart} from "recharts";
import {getStorage} from "../../actions/storage";
import {dbApi} from "../../actions/nodes";
import {setAssets} from "../../actions/setAssets";
import {getAssetById} from "../../actions/assets";
import {getAccountData} from "../../actions/store";

const COLORS =
    ['#F44336', '#9C27B0', '#3F51B5', '#2196F3', '#4CAF50', '#FF9800', '#795548', '#607D8B', '#8BC34A', '#00BCD4'];

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

const portfolioData = async () => {
    const name = getAccountData().name;
    let data = [], balancesLength = 0;

    await dbApi('get_full_accounts', [[name], false]).then(async e => {
        balancesLength = e[0][1].balances.length;

        for (let i = 0; i < balancesLength; i++) {
            data.push({
                value: await setAssets({
                    quantity: e[0][1].balances[i].balance,
                    asset: e[0][1].balances[i].asset_type
                }),
                name: await getAssetById(e[0][1].balances[i].asset_type),
                color: COLORS[i]
            })
        }
    });

    return data;
};

class GraphMyAssets extends Component {
    state = {
        pieData: false
    };

    componentDidMount() {
        portfolioData().then(e => this.setState({pieData: e}));
    }

    render() {
        const {pieData} = this.state;

        return (
            <div className="card__content graph__pie">
                {
                    pieData &&
                    <Fragment>
                        <PieChart width={270} height={270} onMouseEnter={this.onPieEnter}>
                            <Pie data={pieData} dataKey='value' cx={135} cy={135} innerRadius={55} outerRadius={105}
                                 fill="#8884d8"
                                 labelLine={false}
                                 label={renderCustomizedLabel}
                                 isAnimationActive={false}
                            >
                                {
                                    pieData.map((item, index) => <Cell fill={item.color} key={index}/>)
                                }
                            </Pie>
                        </PieChart>
                        <div className="pie__dots">
                            {
                                pieData.map((item, index) =>
                                    <div className="dot" key={item.name.symbol}>
                                        <span className="circle" style={{backgroundColor: item.color}}/>
                                        {item.name.symbol}
                                    </div>
                                )
                            }
                        </div>
                    </Fragment>
                }
            </div>
        )
    }
}

export default GraphMyAssets;

