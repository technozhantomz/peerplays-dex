import React, {useState, useEffect} from "react";
import Translate from "react-translate-component";
import { Card } from "../../helpers/card";
import { CardHeader } from "../../helpers/cardHeader";
import Grid from '@material-ui/core/Grid';
import { getStore } from "../../../actions/store";
import Input from "../../helpers/form/input";
import Dropdown from "../../helpers/form/dropdown";
import SelectHeader from "../../helpers/selectHeader";


function HiveTransactions() {
    const { accountData } = getStore();
    const [sidechainAccount, setSidechainAccount] = useState();
    const [sidechain, setSidechain] = useState('hive');
    const [fee, setFee] = useState({amount: 0, symbol: accountData.assets[0].symbol});
    const [hasDepoAddress, setHasDepoAddress] = useState(false);
    const [selectedPair,setselectedPair]=useState('')
    const [recentPairs,setrecentPairs]= useState(['HIVE','HBD'])

    useEffect(() => {
        if(accountData.sidechainAccounts){
            accountData.sidechainAccounts.filter(act => (act.sidechain == sidechain) ? setSidechainAccount(act): '');  
        }
        if(sidechainAccount && sidechainAccount.deposit_address != ''){
            setHasDepoAddress(true);
        }
    });

 
    return(
        <div className="container">
            <div className="page__header-wrapper">
                <Translate className="page__title" component="h1" content={"hive.title"}/>
            </div>
            <div>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={hasDepoAddress ? 6 : 12}>
                            <div className="graphs">
                                <Card mode={hasDepoAddress ? "widget__btc" : "btc-generate MuiGrid-root modal open MuiGrid-item MuiGrid-grid-xs-12"}>
                                    <CardHeader title={"hive.title"} />
                                    <div className="card__content"> 
                                    <div className="form form--btc">
                                            <Input name="amount" className="modal__field" />
                                            <Dropdown
                                                    btn={<SelectHeader
                                                        text={selectedPair}
                                                        className="with-bg mr"
                                                    />}
                                                    list={recentPairs.map((e, id) => <button key={id} onClick={() =>setselectedPair(e)}>{e}</button>)}
                                                />
                                            <Input name="hiveAccount" className="modal__field"/>
                                        <div className="info__row">
                                            <span><Translate content={'field.labels.fee'}/>: {fee.amount} {fee.symbol}</span>
                                        </div>            
                                        <div className="btn__row">
                                        <Translate component="div"className="btn-round btn-round--buy" onClick={() => submitGenerateAddress()} content={'buttons.withdraw'} />
                                        </div>
                                    </div>
                                    </div>
                                </Card>
                            </div>
                        </Grid>
                    </Grid>
                </div>
        </div>
    );
}

export default HiveTransactions