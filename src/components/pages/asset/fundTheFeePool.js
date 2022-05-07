import React, {Component, Fragment} from "react";
import Input from "../../helpers/form/input";
import {CardHeader} from "../../helpers/cardHeader";
import Translate from "react-translate-component";
import Form from "../../helpers/form/form";
import {getAccountData, getBasicAsset} from "../../../actions/store";
import {assetFundFeePool} from "../../../actions/forms/assetFundFeePool";

class FundTheFeePool extends Component {
    state = {
        sended: false,
        defaultData: false,
        userTokens: false
    };

    componentDidMount() {
        const user = getAccountData();
        const userTokens = user.assets;
        const basicAsset = getBasicAsset();

        const defaultData = {
            from: user.name,
            quantityAsset: basicAsset.symbol,
            fee: 0,
            feeAsset: basicAsset.symbol,
            quantity: 0
        };

        this.setState({userTokens, defaultData});
    }

    handleFundTheFeePool = (data) => {
        const context = this;
        this.setState({sended: true}, () => setTimeout(() => context.setState({sended: false}), 5000));
    };

    render() {
        const title = this.props.title;
        const {defaultData, sended} = this.state;

        if (!defaultData) return <span/>;

        return (
            <div className="card card--action">
                <CardHeader title={`block.${title}.title`}/>
                <Translate component="div" className="card__comment" content={`block.${title}.text`}/>
                <Form className="asset-action__content"
                      type={'asset_fund_fee_pool'}
                      defaultData={defaultData}
                      requiredFields={['from', 'quantity']}
                      action={assetFundFeePool}
                      handleResult={this.handleFundTheFeePool}
                      needPassword
                >
                    {
                        form => {
                            const {errors, data} = form.state;
                            return (
                                <Fragment>
                                    <div className="asset-action__row">
                                        <Input
                                            name="from"
                                            error={errors}
                                            value={data}
                                            disabled
                                        />
                                        <Input
                                            type="number"
                                            labelTag="exchangeForm.quantity"
                                            labelParams={{token: data.quantityAsset}}
                                            name="quantity"
                                            value={data}
                                            error={errors}
                                            className="asset-action__quantity"
                                            onChange={form.handleChange}
                                        />
                                    </div>
                                    <div className="btn__row">
                                        <span>Fee: {data.fee} {data.quantityAsset}</span>
                                        {sended && <span className="clr--positive">Transaction Completed</span>}
                                        <button type="submit" className="btn-round btn-round--fund">Fund</button>
                                    </div>
                                </Fragment>
                            )
                        }
                    }
                </Form>
            </div>
        )
    }
}

export default FundTheFeePool;