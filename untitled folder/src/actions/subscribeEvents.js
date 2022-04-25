import {store} from "../index";
import {updateAccount} from "../dispatch/setAccount";
import {formAccount} from "./account/formAccount";
import {getStorage} from "./storage";
import {setNewNotification} from "./notifications";
import {setUserPage} from "../dispatch/userPage";
import {getAccountData, getStore} from "./store";
import {setMaintenance} from "../dispatch";

export const subscribeEvents = async (event) => {
    if(event[0].length === 1){
        setMaintenance(event[0][0]);
        return;
    }

    let operationType = '';
    const account = getAccountData();
    const operation = event[0].find(el => {
        if(typeof el !== 'object') return false;

        const isUpdatable = el.op && Object.keys(getUpdate).includes(String(el.op[0]));

        if(!isUpdatable) return false;

        const [opType, opData] = el.op;

        operationType = opType;

        return getUpdate[opType](opData)(account.id);
    });

    if(!operation) return;
    if(operationType === 0 && getStorage('settings').notifications) setNewNotification(account, operation);
    updateAccount(await formAccount(account.name));
};

const checkAccount = id => activeUserId => id === activeUserId;
const doubleCheckAccount = (senderID, receiverID) => activeUserID => {
    const arrToCheck = [senderID, receiverID];
    const activeUserPage = getStore().pageData;
    if(activeUserPage.id && arrToCheck.includes(activeUserPage.id)) formAccount(activeUserPage.name).then(setUserPage);
    return arrToCheck.includes(activeUserID);
};

const checkTransfer = ({from, to}) => doubleCheckAccount(from, to);
const checkLOCreate = ({seller}) => checkAccount(seller);
const checkLOCancel = ({fee_paying_account}) => checkAccount(fee_paying_account);
const checkLOFill = ({account_id, is_maker}) => is_maker || checkAccount(account_id);
const checkAccUpdate = ({account}) => checkAccount(account);
const checkAccUpgrade = ({account_to_upgrade}) => checkAccount(account_to_upgrade);
const checkAssetIssuer = ({issuer}) => checkAccount(issuer);
const checkAssetIssue = ({issuer, issue_to_account}) => doubleCheckAccount(issuer, issue_to_account);
const checkAssetFund = ({from_account}) => checkAccount(from_account);

const getUpdate = {
    0: checkTransfer,
    1: checkLOCreate,
    2: checkLOCancel,
    4: checkLOFill,
    6: checkAccUpdate,
    8: checkAccUpgrade,
    10: checkAssetIssuer,
    11: checkAssetIssuer,
    14: checkAssetIssue,
    16: checkAssetFund,
    43: checkAssetIssuer,
    47: checkAssetIssuer,
    48: checkAssetIssuer,
};