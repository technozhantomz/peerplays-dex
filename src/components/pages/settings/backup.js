import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    backupBrain,
    backupWallet,
    restoreFromBin,
    restoreFromBrain
} from "../../../actions/wallet";
import BackupItem from "../../helpers/backupItem";
import {getStorage} from "../../../actions/storage";
import {getStoragedAccount} from "../../../actions/account";

const backupsList = [
    {
        type: 'wallet',
        backupDate: 'backup_date',
        action: backupWallet
    },
    {
        type: 'brainkey',
        backupDate: 'brainkey_backup_date',
        action: backupBrain
    }
];

const restoreList = [
    {
        type: 'fromBin',
        action: restoreFromBin
    },
    {
        type: 'fromPrivate',
        action: e => e.preventDefault
    },
    {
        type: 'fromBrain',
        action: restoreFromBrain
    }
];

class Backup extends Component{
    render(){
        const isWallet = getStoragedAccount().type === 'wallet';
        return(
            <div className="backup">
                { isWallet && <BackupItem type={'backup'} actionsList={backupsList} data={this.props.wallet} /> }
                <BackupItem type={'restore'} actionsList={restoreList} />
            </div>
        )
    }
}

const mapStateToProps = state => ({wallet: state.loginData});

export default connect(mapStateToProps)(Backup);