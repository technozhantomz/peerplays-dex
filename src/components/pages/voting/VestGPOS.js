import { Card, CardActions, CardContent } from '@material-ui/core';
import React, { useState } from 'react';
import NumericInput from 'react-numeric-input';
import { connect, useSelector } from "react-redux";
import Translate from 'react-translate-component';
import { getPassword, trxBuilder } from '../../../actions/forms';
import { getStore } from '../../../actions/store';

const VestGPOS = (props) => {
	const { symbol_id, precision, symbol, totalGpos, getAssets } = props;
	const { loginData, accountData } = getStore();
	const [vestAmount, setVestAmount] = useState(0);
	const accBalance = accountData.assets[0].amount / (10 ** accountData.assets[0].precision);

	const SubmitGposVesting = () => {
		const begin_timestamp = new Date().toISOString().replace('Z', '');
		const trx = {
			type: 'vesting_balance_create',
			params: {
				fee: {
					amount: 0,
					asset_id: symbol_id
				},
				creator: accountData.id,
				owner: accountData.id,
				amount: {
					amount: vestAmount * (10 ** precision),
					asset_id: symbol_id
				},
				asset_symbol: symbol,
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
			trxBuilder([trx], [activeKey]).then(() => {
				getAssets();
				setVestAmount(0);
			});
		});
	};
	return (
		<Card mode="widget">
			<div className="card__title">
				Power Up
			</div>
			<CardContent>
				<div style={{ marginBottom: 12 }}>
					<div style={{ display: "inline-block", width: "50%" }}>
						<div style={{ background: "#f0f0f0", margin: 4, padding: 12 }}>
							Opening GPOS Balance: <strong>{totalGpos} {symbol}</strong>
						</div>
					</div>
				</div>
				<Translate content='deposit.title' />
				<NumericInput
					strict={true}
					style={{ color: "#f0f0f0" }}
					mobile
					type="number"
					className="field__input form-control cpointer"
					min={0}
					step={(component, direction) => {
						// for values smaller than 1 the step is 0.1
						// for values greater than 1 the step is 1
						return component.state.value < 1 ? 0.1 : 1
					}}
					precision={accountData.assets[0].precision}
					max={accBalance}
					onChange={(value) => setVestAmount(value)}
					value={vestAmount}
				/>
				<div style={{ marginTop: 12, color: "#ff444a", display: (vestAmount == null || vestAmount == 0) ? "block" : "none" }}>
					This field is required and not zero
				</div>
				<div style={{ marginTop: 12, color: "#ff444a", display: (vestAmount == null || vestAmount > accBalance) ? "block" : "none" }}>
					Value cannot exceed {accBalance}
				</div>
				<div style={{ marginTop: 12 }}>
					New GPOS Balance: <strong>{totalGpos + vestAmount} {symbol}</strong>
				</div>
			</CardContent>
			<CardActions >
				<button className="btn-round btn-round--buy" onClick={() => (vestAmount == null || vestAmount == 0 || vestAmount > accBalance) ? "" : SubmitGposVesting()}>Vest</button>
			</CardActions>
		</Card>
	)
};

//const mapStateToProps = state => ({ account: state.accountData });

export default VestGPOS;