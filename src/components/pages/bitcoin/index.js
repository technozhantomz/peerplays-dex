import React, {useState, useEffect} from "react";
import Translate from "react-translate-component";
import { Card } from "../../helpers/card";
import { CardHeader } from "../../helpers/cardHeader";
import Grid from '@material-ui/core/Grid';
import WithdrawBTCForm from './withdrawBTCForm';
import GenerateAddress from "./generateAddress";
import UpdateAddress from "./updateAddress";
import { getStore } from "../../../actions/store";

function BitcoinTransactions() {
    const { loginData, accountData } = getStore();
    const [sidechainAccount, setSidechainAccount] = useState();
    const [sidechain, setSidechain] = useState('bitcoin');

    useEffect(() => {
        if(accountData.sidechainAccounts){
            accountData.sidechainAccounts.filter(act => {(act.sidechain == sidechain) ? setSidechainAccount(act) : ""});  
        }
    });

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
                                    <CardHeader title={sidechainAccount ? `bitcoin.updateAddress.title` : 'bitcoin.generateAddress.title'} />
                                    <div className="card__content"> 
                                        {sidechainAccount ? 
                                            <UpdateAddress 
                                                accountData={accountData} 
                                                sidechainAccount={sidechainAccount}
                                                oginData={loginData}
                                                sidechain={sidechain}/> 

                                        :
                                            <GenerateAddress
                                                accountData={accountData} 
                                                oginData={loginData}
                                                sidechain={sidechain}/>

                                        }
                                    </div>
                                </Card>
                            </div>
                        </Grid>
                        {sidechainAccount &&
                            <Grid item xs={12} sm={6}>
                                <div className="graphs">
                                    <Card mode="widget">
                                        <CardHeader title={`bitcoin.withdraw.title`} />
                                        <WithdrawBTCForm accountData={accountData} loginData={loginData}/>
                                    </Card>
                                </div>
                            </Grid>
                        }
                    </Grid>
                </div>
        </div>
    );
}

export default BitcoinTransactions