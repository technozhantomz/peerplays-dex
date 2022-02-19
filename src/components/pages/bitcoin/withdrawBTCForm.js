import React, {Component,  Fragment} from "react";
import Translate from "react-translate-component";
import {  getAccountData, getBasicAsset } from "../../../actions/store";
import Form from "../../helpers/form/form";
import Input from "../../helpers/form/input";
import {transfer} from "../../../actions/forms"

class WithdrawBTCForm extends Component {
    state = {
        sended: false,
        defaultData: false,
    };

    componentDidMount() {
        const user = getAccountData();
        const startAsset = 'BTC';
        const basicAsset = getBasicAsset().symbol;
        const defaultData = {
            from: user.name,
            quantityAsset: startAsset,
            fee: 0,
            feeAsset: basicAsset,
            quantity: 0,
            memo: '',
            to: 'son-account'
        };

        this.setState({ defaultData });
    }

    handleTransfer = (data) => {
        const context = this;
        window.location.reload();
        this.setState({sended: true}, () => setTimeout(() => context.setState({sended: false}), 5000));

        if(this.props.update) {
            this.props.update();
        }
    };


    render() {
        const {sended, defaultData} = this.state;

        if (!defaultData) return <span/>;
		return (
			<div className="card__content">
				<Form
					type={'transfer'}
					className="form form--btc form--btc__widget"
					defaultData={defaultData}
					requiredFields={['to', 'quantity']}
					action={transfer}
					handleResult={this.handleTransfer}
					needPassword
				>
				{
					form => {
						const {errors, data} = form.state;

						return (
							<Fragment>
								<div className="input__row">
									<Input
										style={{"display": "none"}}
										name="from"
										onChange={form.handleChange}
										error={errors}
										value={data}
										disabled
									/>
									<Input
										labelTag="field.labels.withdrawAmount"
										name="quantity"
										type="number"
										onChange={form.handleChange}
										error={errors}
										value={data}
									/>
								</div>
								<div className="input__row">
									<Input
										style={{"display": "none"}}
										name="to"
										disabled
										onChange={form.handleChange}
										error={errors}
										value={data}
									/>
									
									<Input
										style={{"display": "none"}}
										name="quantityAsset"
										disabled
										onChange={form.handleChange}
										error={errors}
										value={data}
									/>
								</div>
								<div className="info__row">
									{sended && <span className="clr--positive">Transaction Completed</span>}
									<span>Fee: {data.fee} {data.feeAsset}</span>
								</div>
								<div className="btn__row">
									<button type="submit" className="btn-round btn-round--buy">Withdraw</button>
								</div>
							</Fragment>
						)
					}
				}
				</Form>
			</div>
		)
	};
}

export default WithdrawBTCForm;