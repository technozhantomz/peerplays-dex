import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import { connect } from "react-redux";
import { dbApi } from '../../../actions/nodes'
//Opening GPOS Balance 215 TEST
// Available GPOS Balance 0 TEST
//Withdraw
//New GPOS Balance 215
const WithdrawGPOS = (props) => {


	useEffect(() => {

	}, [props])
	return (
		<div className="card">
			<div class="card-header">
				Power Down
			</div>
			<div className="card-body">
				<Row>
					<Col>
						<div className="card">
							<div className="card-body">
								Opening GPOS Balance: {props.data.totalGpos} {props.data.symbol}
							</div>
						</div>
					</Col>
					<Col>
						<div className="card">
							<div className="card-body">
								Available GPOS Balance: {props.data.availableGpos} {props.data.symbol}
							</div>
						</div>
					</Col>
				</Row>
				<div className="m-3">
					<h5 class="card-title">Withdraw</h5>
					<NumericInput mobile className="form-control" />
				</div>

				<div className="card">
					<div className="card-body">
						New GPOS Balance: 215 {props.data.symbol}
					</div>
				</div>
			</div>
			<div class="card-footer">
				<div className="card">
					<Button>Withdraw</Button>
				</div>
			</div>
		</div>
	)
};

const mapStateToProps = state => ({ account: state.accountData, state });

export default connect(mapStateToProps)(WithdrawGPOS);