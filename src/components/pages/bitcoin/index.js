import React, {useState} from "react";
import Translate from "react-translate-component";
import { Card } from "../../helpers/card";
import { CardHeader } from "../../helpers/cardHeader";
import Grid from '@material-ui/core/Grid';
import WithdrawBTCForm from './withdrawBTCForm';
import GenerateAddress from "./generateAddress";
import { getStore } from "../../../actions/store";

function BitcoinTransactions() {
    const { loginData, accountData } = getStore();

    return(
        <div className="container">
            <div className="page__header-wrapper">
                <Translate className="page__title" component="h1" content={"bitcoin.title"}/>
            </div>
            <div>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <div className="graphs">
                                <Card mode="widget">
                                    {/* <CardHeader title={`block.quickSellBuy.title`} /> */}
                                    <div className="card__content"> 
                                      {/* TODO: check if use already has BTC sidechain set up */}
                                      {/* if they do then show there deposit key and update withdraw address form */}
                                      {/* else show generate address form */}
                                        <GenerateAddress
                                            accountData={accountData} 
                                            oginData={loginData}
                                            sidechain="bitcoin"
                                        />
                                    </div>
                                </Card>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="graphs">
                                <Card mode="widget">
                                    <CardHeader title={`bitcoin.withdraw.title`} />
                                    <WithdrawBTCForm accountData={accountData} loginData={loginData}/>
                                </Card>
                            </div>
                        </Grid>
                    </Grid>
                </div>
        </div>
    );
}

export default BitcoinTransactions