import { Card, CardActions, CardContent } from '@material-ui/core';
import React, { useState } from 'react';
import NumericInput from 'react-numeric-input';
import Translate from 'react-translate-component';
import { getPassword, trxBuilder } from '../../../actions/forms';
import { dbApi } from '../../../actions/nodes';
import { getStore } from '../../../actions/store';

const WithdrawGPOS = (props) => {
	const { loginData, accountData } = getStore();
	const { symbol_id, precision, symbol, totalGpos, availableGpos, getAssets } = props;
	const [withdrawAmount, setWithdrawAmount] = useState(0);
	const [isBalanceAvailable, setIsBalanceAvailable] = useState(true);
	const SubmitGposWithdrawal = () => {
		const begin_timestamp = new Date().toISOString().replace('Z', '');
		dbApi('get_vesting_balances', [
			accountData.id
		]).then((balances) => {
			if(availableGpos > 0){
				setIsBalanceAvailable(true);
				const gposBalances = balances.filter(balance => balance.balance_type == 'gpos');
				const trx = {
					type: 'vesting_balance_withdraw',
					params: {
						fee: {
							amount: 0,
							asset_id: symbol_id
						},
						vesting_balance: gposBalances[0].id,
						owner: accountData.id,
						amount: {
							amount: withdrawAmount * (10 ** precision),
							asset_id: symbol_id
						},
					}
				};
				getPassword(password => {
					const activeKey = loginData.formPrivateKey(password, 'active');
					trxBuilder([trx], [activeKey]).then(() => {
						getAssets();
						setWithdrawAmount(0);
					});
				});
			} else {
				setIsBalanceAvailable(false);
			}
		})
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
							Opening GPOS Balance: <strong>{totalGpos} {symbol}</strong>
						</div>
					</div>
					<div style={{ display: "inline-block", width: "50%" }}>

						<div style={{ background: "#f0f0f0", margin: 4, padding: 12 }}>
							Available GPOS Balance:<strong> {availableGpos} {symbol}</strong>
						</div>
					</div>

				</div>

				<Translate content='withdraw.title' />
				<NumericInput
					strict={true}
					style={{ color: "#f0f0f0" }}
					mobile
					type="number"
					className="field__input form-control cpointer"
					min={0}
					max={availableGpos}
					precision={accountData.assets[0].precision}
					onChange={(value) => setWithdrawAmount(value)}
					value={withdrawAmount}
				/>

				<div style={{ marginTop: 12 }}>
					New GPOS Balance: <strong>{totalGpos - withdrawAmount} {symbol}</strong>
				</div>
			</CardContent>

			<CardActions >
				<button className="btn-round btn-round--buy" onClick={SubmitGposWithdrawal}>Withdraw</button>
				{!isBalanceAvailable && <h3 className="clr--negative">There is no available gpos.</h3>}
			</CardActions>
		</Card>
	)
};


export default WithdrawGPOS;
