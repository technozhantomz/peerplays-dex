import React, {useState, useEffect} from 'react';
import Input from "../../helpers/form/input";
import { getPassword, trxBuilder } from '../../../actions/forms';
import {dbApi} from "../../../actions/nodes";
import { useFormInput } from './formInput';

const WithdrawBTCForm = (props) => {
    const {loginData, accountData} = props;
	const [sent, setSent] = useState(false);
	const withdrawAmount = useFormInput(0);
	const [accBalance, setAccbalance] = useState(0);
	const [fee, setFee] = useState({amount: 0, symbol: accountData.assets[0].symbol});
	const [precision, setPrecision] = useState(accountData.assets[0].precision)
	const [errors, setErrors] = useState(''); 

	useEffect(() => {
		if(accountData.assets[1]){
			setAccbalance(accountData.assets[1].amount / (10 ** accountData.assets[1].precision));
			setPrecision(accountData.assets[1].precision);
		}
	})

    const getSonAccount = async () => { 
        const sonAccount = await dbApi('get_account_by_name', ["son-account"]).then(e => e);
        return sonAccount
    };

    const SubmitWithDraw = async () => {
		setErrors('');
        const sonAccount = await getSonAccount();
		const trx = {
			type: 'transfer',
			params: {
				fee,
                from: accountData.id,
                to: sonAccount.id,
                amount: {
					amount: withdrawAmount.value,
					asset_id: accountData.assets[1].id
				}
			}
		};
		getPassword(password => ProccesWithdraw(trx, password));
	};

	const ProccesWithdraw = async (trx, password) => {
		try {
			const activeKey = loginData.formPrivateKey(password, 'active');
			const trxResult = await trxBuilder([trx], [activeKey]);
			if(trxResult){
				setSent(true);
				setTimeout(() => {
					withdrawAmount.value = 0;
					setSent(false);
				}, 5000);
			}	
		} catch (error) {
			setErrors('ERROR');
		}	
	};

    return(
		<div className="card__content">
			<div className="form form__send">
				<div className="input__row">
					<Input name="withdrawAmount" type="number" className="modal__field"	{...withdrawAmount}/>
				</div>
				<div className="info__row">
					<span>Fee: {fee.amount} {fee.symbol}</span>
					{sent && <span className="clr--positive">Transaction Completed</span>}
					{errors === 'ERROR' && <span className="clr--negative">Something went wrong!! Try again. </span>}
					{(withdrawAmount.value == 0) && <span className="clr--negative">This field is required and not zero.</span>}
					{(withdrawAmount.value > accBalance) && <span className="clr--negative">Value cannot exceed {accBalance}.</span>}
				</div>
				<div className="btn__row">
					<button className="btn-round btn-round--buy" onClick={() => (withdrawAmount.value == 0 || withdrawAmount.value > accBalance) ? "" : SubmitWithDraw()}>Withdraw</button>
				</div>
			</div>
		</div>
    )
};


export default WithdrawBTCForm;