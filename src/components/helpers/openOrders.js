import React, {Component} from 'react';
import {PieChart, Pie, Cell} from "recharts";
import {getStorage} from "../../actions/storage";
import {dbApi} from "../../actions/nodes";
import {setAssets} from "../../actions/setAssets";
import {getAssetById} from "../../actions/assets";
import {getStoragedAccount} from "../../actions/account";
import {getAccountData} from "../../actions/store";

const COLORS = ['#41D83B', '#E2E2E2'];
const COLORS2 = ['#9939CD', '#E2E2E2'];

const orderCalc = async (forSaleAmount, base, quote) => {
    let arrOrder = {};
    arrOrder.percent = 100 - forSaleAmount / base.amount * 100;
    const count = Math.floor(arrOrder.percent);

    arrOrder.data = [];

    for (let i = 0; i < count; i++) {
        arrOrder.data.push({flag: 0, value: 1});
    }

    for (let i = 0; i < 100 - count; i++) {
        arrOrder.data.push({flag: 1, value: 1});
    }

    arrOrder.amount = await setAssets({
        quantity: base.amount,
        asset: base.asset_id
    });

    arrOrder.quote = await getAssetById(quote.asset_id);
    arrOrder.base = await getAssetById(base.asset_id);

    return arrOrder;
};

const orderData = async () => {
    const name = getAccountData().name;
    let zeroOrder = [], firstOrder = [];

    await dbApi('get_full_accounts', [[name], false]).then(async e => {
        if (e[0][1].limit_orders.length) {
            zeroOrder = await orderCalc(
                e[0][1].limit_orders[0].for_sale,
                e[0][1].limit_orders[0].sell_price.base,
                e[0][1].limit_orders[0].sell_price.quote
            );
            firstOrder = await orderCalc(
                e[0][1].limit_orders[1].for_sale,
                e[0][1].limit_orders[1].sell_price.base,
                e[0][1].limit_orders[1].sell_price.quote,
            );
        } else {
            zeroOrder = false;
            firstOrder = false;
        }
    });

    return {
        0: zeroOrder,
        1: firstOrder
    };
};

class OpenOrders extends Component {
    state = {
        zeroOrder: false,
        firstOrder: false
    };

    componentDidMount() {
        orderData().then(e => {
            this.setState({zeroOrder: e[0], firstOrder: e[1]})
        });
    };

    render() {
        const {zeroOrder, firstOrder} = this.state;

        return (
            <div className="pie">
                {
                    zeroOrder &&
                    <div className="pie__info pie__info--first">
                        <span>{zeroOrder.amount}</span>
                        <span className="pie__percent">{zeroOrder.percent}%</span>
                    </div>
                }
                {
                    firstOrder &&
                    <div className="pie__info pie__info--second">
                        <span>{firstOrder.amount}</span>
                        <span className="pie__percent">{firstOrder.percent}%</span>
                    </div>
                }
                <PieChart width={600} height={236} onMouseEnter={this.onPieEnter}>
                    {
                        zeroOrder &&
                        <Pie
                            data={zeroOrder.data}
                            dataKey='value'
                            cx={155}
                            cy={118}
                            innerRadius={70}
                            outerRadius={100}
                            fill="#41D83B"
                            paddingAngle={1}
                            startAngle={90}
                            endAngle={-270}
                            isAnimationActive={false}
                        >
                            {
                                zeroOrder.data.map((el, index) => <Cell fill={COLORS[el.flag]} key={index}/>)
                            }
                        </Pie>
                    }
                    {
                        firstOrder &&
                        <Pie
                            data={firstOrder.data}
                            dataKey='value'
                            cx={445}
                            cy={118}
                            innerRadius={70}
                            outerRadius={100}
                            fill="#41D83B"
                            paddingAngle={1}
                            startAngle={90}
                            endAngle={-270}
                            isAnimationActive={false}
                        >
                            {
                                firstOrder.data.map((el, index) => <Cell fill={COLORS2[el.flag]} key={index}/>)
                            }
                        </Pie>
                    }
                </PieChart>
                <div className="pie__labels">
                    {
                        zeroOrder &&
                        <span>
                            {zeroOrder.quote.symbol} > {zeroOrder.base.symbol}
                        </span>
                    }

                    {
                        firstOrder &&
                        <span>
                            {firstOrder.quote.symbol} > {firstOrder.base.symbol}
                        </span>
                    }
                </div>
            </div>
        )
    }
}

export default OpenOrders;