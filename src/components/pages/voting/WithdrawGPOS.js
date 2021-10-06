import { Card, CardActions, CardContent } from '@material-ui/core';
import React, { useState } from 'react';
import NumericInput from 'react-numeric-input';
import { connect } from "react-redux";
import Translate from 'react-translate-component';
import { getStore } from '../../../actions/store';

const WithdrawGPOS = (props) => {
	const { loginData, accountData } = getStore();
	const [withdrawAmount, setWithdrawAmount] = useState(0);


	const SubmitGposWithdrawal = () => {
		const begin_timestamp = new Date().toISOString().replace('Z', '');

		const trx = {
			type: 'vesting_balance_withdraw',
			params: {
				fee: {
					amount: 0,
					asset_id: props.data.symbol_id
				},
				creator: accountData.id,
				owner: accountData.id,
				amount: {
					amount: withdrawAmount * (10 ** props.data.precision),
					asset_id: props.data.symbol_id
				},
				asset_symbol: props.data.symbol,
				policy: [
					0, {
						begin_timestamp,
						vesting_cliff_seconds: 0,
						vesting_duration_seconds: 0
					}
				],
				balance_type: 'gpos'
			}
		};
		getPassword(password => {
			const activeKey = loginData.formPrivateKey(password, 'active');
			trxBuilder([trx], [activeKey]);
		});
	}
	return (
		<Card mode="widget">
			<div className="card__title">
				Power Down
			</div>
			<CardContent>
				<div style={{ marginBottom: 12 }}>
					<div style={{ display: "inline-block", width: "50%" }}>
						<div style={{ background: "#f0f0f0", margin: 4, padding: 12 }}>
							Opening GPOS Balance: <strong>{props.data.totalGpos} {props.data.symbol}</strong>
						</div>
					</div>
					<div style={{ display: "inline-block", width: "50%" }}>

						<div style={{ background: "#f0f0f0", margin: 4, padding: 12 }}>
							Available GPOS Balance:<strong> {props.data.availableGpos} {props.data.symbol}</strong>
						</div>
					</div>

				</div>

				<Translate content='deposit.title' />
				<NumericInput
					style={{ color: "#f0f0f0" }}
					mobile
					type="number"
					className="field__input form-control"
					min={0}
					max={accountData.assets[0].amount / (10 ** accountData.assets[0].precision)}
					onChange={(value) => setWithdrawAmount(value)}
					value={withdrawAmount}
				/>

				<div style={{ marginTop: 12 }}>
					New GPOS Balance: <strong>{props.data.totalGpos + parseFloat(withdrawAmount)} {props.data.symbol}</strong>
				</div>
			</CardContent>

			<CardActions >
				<button className="btn-round btn-round--buy" onClick={SubmitGposWithdrawal}>Withdraw</button>
			</CardActions>
		</Card>
	)
};

const mapStateToProps = state => ({ account: state.accountData, state });

export default connect(mapStateToProps)(WithdrawGPOS);