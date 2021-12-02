import React, {useState} from 'react';
import Input from "../../helpers/form/input";
import { getPassword, feeCalculator, transfer } from '../../../actions/forms';


const WithdrawBTCForm = (props) => {
    const {loginData, accountData, sidechain, sidechainAccount} = props;
	const [sent, setSent] = useState(false);
	const [withdrawAmount, setWithdrawAmount] = useState(0);
	const [fee, setFee] = useState({amount: 0, symbol: accountData.assets[0].symbol});
	const [errors, setErrors] = useState(''); 
	const sidechainAsset = accountData.assets[1] ? accountData.assets[1] : {};
	const accBalance = sidechainAsset.amount ?  sidechainAsset.amount / (10 ** sidechainAsset.precision) : 0;
	const feeCalc = feeCalculator['transfer'];
	
	const handleChange = (e) => {
        setWithdrawAmount(e);
		const {feeErr, feeAmount, errVariable} = feeCalc(e, sidechainAsset.symbol, '');
		if (feeErr) errors[errVariable] = feeErr;
		setFee({
			amount: feeAmount,
			symbol: accountData.assets[0].symbol
		});
    }

	const handleWithdraw = (data) => {
		setSent(true);
		setTimeout(() => {
			withdrawAmount.value = 0;
			setSent(false);
		}, 5000);	
	};

    const SubmitWithDraw = async () => {
		setErrors('');
		getPassword(password => transfer({
			contacts:[],
			fee: fee.amount,
			feeAsset: fee.symbol,
			from: accountData.name,
			password,
			quantity: withdrawAmount,
			quantityAsset: sidechainAsset.symbol,
			to: 'son-account'
		}).then((result) => {
			result.success ? handleWithdraw(result.callbackData) : setErrors(result.errors);
		}));
	};

    return(
		<div className="card__content">
			<div className="form form__btc">
				<div className="input__row">
					<Input 
						name="withdrawAmount" 
						type="number" 
						className="modal__field"
						value = {withdrawAmount}	
						onChange={handleChange}/>
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