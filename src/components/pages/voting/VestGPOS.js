import { Card, CardActions, CardContent } from '@material-ui/core';
import React, { useState } from 'react';
import NumericInput from 'react-numeric-input';
import { connect, useSelector } from "react-redux";
import Translate from 'react-translate-component';
import { formAccount } from '../../../actions/account';
import { getPassword, trxBuilder } from '../../../actions/forms';
import { getStore,getAccountData } from '../../../actions/store';
import {updateAccount} from "../../../dispatch/setAccount";



const VestGPOS = (props) => {
	const { symbol_id, precision, symbol, totalGpos, getAssets } = props;
	const { loginData, accountData } = getStore();
	const [vestAmount, setVestAmount] = useState(0);
	const accBalance = accountData.assets[0].amount / (10 ** accountData.assets[0].precision);

	const account = getAccountData();

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
			trxBuilder([trx], [activeKey]).then(async() => {
				getAssets();
				setVestAmount(0);
				updateAccount(await formAccount(account.name));
			});
			
		});
	};
	return (
		<Card mode="widget" style={{ height:"100%"}}>
			<div className="card__title" style={{ paddingTop:"20px" , borderTopLeftRadius:"10px" , borderTopRightRadius:"10px"}}>
			<Translate content={"voting.powerUp"} />
			</div>
			<CardContent >
				<div style={{ marginBottom: 12 }}>
					<div style={{ display: "inline-block", width: "100%" }}>
						<div style={{ background: "#f0f0f0", margin: 4, padding: 12 }}>
						<Translate content={"voting.openGpos"} />: <strong>{totalGpos} {symbol}</strong>
						</div>
					</div>
				</div>
				<Translate style={{ fontWeight:"bold",margin:"10px",display:"block"}} content='deposit.title' />
				<div className='input-cus-style'>
				<NumericInput
					strict={true}
					style={{ color: "#f0f0f0", background:"transparent" }}
					mobile
					type="number"
					className="field__input form-control cpointer"
					min={0}
					step={(component, direction) => {
						// for values smaller than 1 the step is 0.1
						// for values greater than 1 the step is 1
						if(direction === 'up'){
						return component.state.value < 1 ? 0.1 : 1
						}else{return component.state.value < 2 ? 0.1 : 1}
					}}
					// step={0.1}
					precision={accountData.assets[0].precision}
					max={accBalance}
					onChange={(value) => setVestAmount(value)}
					value={vestAmount}
				/>
				</div>
				<div style={{ marginTop: 12, color: "#ff444a", display: (vestAmount == null || vestAmount == 0) ? "block" : "none" }}>
					<Translate component="div" className="" content={"errors.requiredAndnotzero"} />
				</div>
				<div style={{ marginTop: 12, color: "#ff444a", display: (vestAmount == null || vestAmount > accBalance) ? "block" : "none" }}>
				<Translate component="div" className="" content={"errors.requiredAndnotzero"+ accBalance} /> 
				</div>
				<div style={{ marginTop: 12 }} className="input-cus-style">
					<div style={{padding:"0 10px"}}>
					<Translate  className="" content={"voting.newGpos"} /> : <strong style={{padding:"0 10px"}}>{totalGpos + vestAmount} {symbol}</strong>
					</div>
				</div>
			</CardContent>
			<CardActions style={{justifyContent:"end"}} >
				<button className="btn-round btn-round--buy" onClick={() => (vestAmount == null || vestAmount == 0 || vestAmount > accBalance) ? "" : SubmitGposVesting()}>Vest</button>
			</CardActions>
		</Card>
	)
};

//const mapStateToProps = state => ({ account: state.accountData });

export default VestGPOS;