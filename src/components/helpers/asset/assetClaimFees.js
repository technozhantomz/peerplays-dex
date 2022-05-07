import React, {Component, Fragment} from "react";
import {CardHeader} from "../cardHeader";
import Translate from "react-translate-component";
import Form from "../form/form";
import Input from "../form/input";
import {getAccountData, getBasicAsset} from "../../../actions/store/index";
import {assetClaimFees} from "../../../actions/forms/assetClaimFees";
import {fetchAssetData} from "../../../actions/dataFetching";

class AssetClaimFees extends Component {
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
            mainAsset: this.props.symbol,
            quantityAssetFees: 0
        };

        this.setState({userTokens, defaultData});
    }

    handleAssetClaimFees = (data) => {
        const context = this;
        this.setState({sended: true}, () => {
            fetchAssetData();
            setTimeout(() => context.setState({sended: false}), 5000)
        });
    };

    render() {
        const title = this.props.title;
        const {defaultData, sended} = this.state;

        if (!defaultData) return <span/>;
        return(
            <div className="card card--action">
                <CardHeader title={`block.${title}.title`}/>
                <Translate component="div" className="card__comment" content={`block.${title}.text`}/>
                <Form className="asset-action__content"
                      type={'asset_claim_fees'}
                      defaultData={defaultData}
                      requiredFields={['quantityAssetFees']}
                      action={assetClaimFees}
                      handleResult={this.handleAssetClaimFees}
                      needPassword
                >
                    {
                        form => {
                            const {errors, data} = form.state;
                            return (
                                <Fragment>
                                    <Input
                                        type="number"
                                        labelTag="exchangeForm.quantity"
                                        labelParams={{token: data.mainAsset}}
                                        name="quantityAssetFees"
                                        value={data}
                                        error={errors}
                                        className="asset-action"
                                        onChange={form.handleChange}
                                    />
                                    <div className="btn__row">
                                        <span>Fee: {data.fee} {data.quantityAsset}</span>
                                        {sended && <span className="clr--positive">Transaction Completed</span>}
                                        <button type="submit" className="btn-round btn-round--fund">Claim</button>
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

export default AssetClaimFees;