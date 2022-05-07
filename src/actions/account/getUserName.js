import {dbApi} from "../nodes";
import {getCache, cacheOps} from "../cacheOps";
import {getStoragedAccount} from "./getStoragedAccount";

export const getUserName = async (id) => {
    const activeUser = getStoragedAccount();
    if(activeUser.id === id) return activeUser.name;

    const cachedUsers = getCache('accounts');
    if(cachedUsers && cachedUsers[id]) return cachedUsers[id];

    let userID = id;

    if(id.includes('1.6.')) userID = await dbApi('get_witnesses', [[id]]).then(acc => acc[0].witness_account);

    const userName = await dbApi('get_accounts', [[userID]]).then(acc => acc[0].name);
    cacheOps('accounts', {[id]: userName});

    return userName;
};