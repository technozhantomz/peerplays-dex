import React, {useState} from 'react';
import NumericInput from 'react-numeric-input';
import { getPassword, trxBuilder } from '../../../actions/forms';
import {dbApi} from "../../../actions/nodes";

const WithdrawBTCForm = (props) => {
    const {loginData, accountData} = props;
	const [sent, setSent] = useState(false);
	const [withdrawAmount, setWithdrawAmount] = useState(0);
    const accBalance = accountData.assets[1].amount / (10 ** accountData.assets[1].precision);

    const getSonAccount = async () => { 
        const sonAccount = await dbApi('get_account_by_name', ["son-account"]).then(e => e);
        return sonAccount
    };

    const SubmitWithDraw = async () => {
        const sonAccount = await getSonAccount();
		const trx = {
			type: 'transfer',
			params: {
				fee: {
					amount: 0, //get sone withdral fee 
					asset_id: accountData.assets[1].id
				},
                from: accountData.id,
                to: sonAccount.id,
                amount: {
					amount: withdrawAmount,
					asset_id: accountData.assets[1].id
				}
			}
		};
		getPassword(password => ProccesWithdraw(trx, password));
	};

	const ProccesWithdraw = async (trx, password) => {
		const activeKey = loginData.formPrivateKey(password, 'active');
		const trxResult = await trxBuilder([trx], [activeKey]);
		if(trxResult){
			setSent(true);
			setTimeout(() => {
				setwithdrawAmount(0);
				setSent(false);
			}, 5000);
		}			
	};

    return(
		<div>
			<div>
				<NumericInput
					strict={true}
					style={{ color: "#f0f0f0" }}
					mobile
					type="number"
					className="field__input form-control cpointer"
					min={0}
					step={0.01}
					precision={accountData.assets[1].precision}
					max={accBalance}
					onChange={(value) => setWithdrawAmount(value)}
					value={withdrawAmount}
				/>
				<div style={{ marginTop: 12, color: "#ff444a", display: (withdrawAmount == null || withdrawAmount == 0) ? "block" : "none" }}>
					This field is required and not zero
				</div>
				<div style={{ marginTop: 12, color: "#ff444a", display: (withdrawAmount == null || withdrawAmount > accBalance) ? "block" : "none" }}>
					Value cannot exceed {accBalance}
				</div>
				{sent && <span className="clr--positive">Transaction Completed</span>}
			</div>	
			<div>
				<button className="btn-round btn-round--buy" onClick={() => (withdrawAmount == null || withdrawAmount == 0 || withdrawAmount > accBalance) ? "" : SubmitWithDraw()}>Withdraw</button>
			</div>
		</div>
    )
};


export default WithdrawBTCForm;