import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import { connect } from "react-redux";
//Opening GPOS Balance
//Deposit
//New GPOS Balance


const VestGPOS = (props) => (
	<div className="card">
		<div class="card-header">
			Power Up
		</div>
		<div className="card-body">
			<Row>
				<Col>
					<div className="card">
						<div className="card-body">
							Opening GPOS Balance: 215 TEST
						</div>
					</div>
				</Col>
			</Row>
			<div className="m-3">
				<h5 class="card-title">Deposit</h5>
				<NumericInput mobile className="form-control" />
			</div>

			<div className="card">
				<div className="card-body">
					New GPOS Balance : 215 TEST
				</div>
			</div>
		</div>
		<div class="card-footer">
			<div className="card">
				<Button>Vest</Button>
			</div>
		</div>
	</div>
);

const mapStateToProps = state => ({ account: state.accountData });

export default connect(mapStateToProps)(VestGPOS);