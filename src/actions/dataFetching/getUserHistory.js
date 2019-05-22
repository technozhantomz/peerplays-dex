import {historyApi} from "../nodes";
import {getAccountData} from "../store";

export const getUserHistory = ({
    userID = getAccountData().id,
    filter = false,
    callback = history => history
}) => historyApi('get_account_history', [userID, '1.11.0', 100, '1.11.9999999999'])
    .then(history => filter || filter === 0 ? history.filter(el => el.op[0] === filter) : history)
    .then(callback);